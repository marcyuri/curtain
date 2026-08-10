import authRepository from "./auth.repository.js";
import { toUserDto } from "../users/users.dto.js";
import { hashPassword, verifyPassword } from "../../shared/utils/hashPassword.js";
import { generateRawToken, hashToken } from "../../shared/utils/tokenHash.js";
import { signAccessToken } from "../../shared/utils/jwt.js";
import { UnauthorizedError } from "../../errors/UnauthorizedError.js";
import { ForbiddenError } from "../../errors/ForbiddenError.js";
import { ConflictError } from "../../errors/ConflictError.js";
import { ValidationError } from "../../errors/ValidationError.js";
import { ErrorCodes } from "../../errors/errorCodes.js";
import env from "../../config/env.js";
import prisma from "../../config/database.js";

const RESET_TOKEN_TTL_MS = 60 * 60 * 1000; // 1h (Document 13 Ch.6.6)
const VERIFICATION_TOKEN_TTL_MS = 24 * 60 * 60 * 1000; // 24h

function buildSessionExpiries() {

    const now = Date.now();

    return {
        idleExpiresAt: new Date(now + env.SESSION_IDLE_TIMEOUT_MINUTES * 60 * 1000),
        absoluteExpiresAt: new Date(now + env.JWT_REFRESH_EXPIRES_IN_DAYS * 24 * 60 * 60 * 1000),
    };

}

async function issueSession(user, { userAgent, ipAddress } = {}) {

    const accessToken = signAccessToken(user);

    const rawRefreshToken = generateRawToken();
    const { idleExpiresAt, absoluteExpiresAt } = buildSessionExpiries();

    await authRepository.createRefreshToken({
        userId: user.id,
        tokenHash: hashToken(rawRefreshToken),
        idleExpiresAt,
        absoluteExpiresAt,
        userAgent,
        ipAddress,
    });

    return { accessToken, rawRefreshToken };

}

async function login({ email, password }, context) {

    const user = await authRepository.findUserByEmail(email);

    if (!user || !(await verifyPassword(password, user.passwordHash))) {
        throw new UnauthorizedError("Email ou mot de passe incorrect.", ErrorCodes.INVALID_CREDENTIALS);
    }

    if (user.status !== "ACTIVE") {
        throw new ForbiddenError("Ce compte est désactivé.");
    }

    const { accessToken, rawRefreshToken } = await issueSession(user, context);

    return { accessToken, rawRefreshToken, user: toUserDto(user) };

}

async function register({ email, password, firstName, lastName, phone }) {

    const existing = await authRepository.findUserByEmail(email);

    if (existing) {
        throw new ConflictError("Un compte existe déjà avec cet email.", ErrorCodes.EMAIL_ALREADY_EXISTS);
    }

    const passwordHash = await hashPassword(password);

    const customerRole = await prisma.role.findUnique({ where: { key: "CUSTOMER" } });

    const user = await prisma.$transaction(async (tx) => {

        const created = await tx.user.create({
            data: { email, passwordHash, firstName, lastName, phone },
        });

        if (customerRole) {
            await tx.userRole.create({
                data: { userId: created.id, roleId: customerRole.id },
            });
        }

        return tx.user.findFirst({
            where: { id: created.id },
            include: {
                roles: { include: { role: { include: { permissions: { include: { permission: true } } } } } },
            },
        });

    });

    const rawToken = generateRawToken();

    await authRepository.createEmailVerificationToken({
        userId: user.id,
        tokenHash: hashToken(rawToken),
        expiresAt: new Date(Date.now() + VERIFICATION_TOKEN_TTL_MS),
    });

    // TODO: envoyer l'email de vérification (Document 13 Ch.11 —
    // module notifications/channels/EmailChannel.js, pas encore
    // implémenté). Le token existe déjà en base, prêt à être exploité
    // dès que l'envoi d'email sera en place.

    return toUserDto(user);

}

async function refresh(rawRefreshToken, context) {

    if (!rawRefreshToken) {
        throw new UnauthorizedError("Session absente.", ErrorCodes.SESSION_EXPIRED);
    }

    const tokenHash = hashToken(rawRefreshToken);
    const existingToken = await authRepository.findRefreshTokenByHash(tokenHash);

    if (!existingToken) {
        throw new UnauthorizedError("Session invalide.", ErrorCodes.SESSION_EXPIRED);
    }

    // Détection de réutilisation (Document 13 Ch.6.3) : un token déjà
    // révoqué représenté à nouveau indique un vol probable — toutes
    // les sessions de l'utilisateur sont révoquées par précaution.
    if (existingToken.revokedAt) {

        await authRepository.revokeAllUserRefreshTokens(existingToken.userId);

        throw new UnauthorizedError(
            "Session invalide, reconnexion requise.",
            ErrorCodes.SESSION_EXPIRED
        );

    }

    const now = new Date();

    if (now > existingToken.idleExpiresAt || now > existingToken.absoluteExpiresAt) {

        await authRepository.revokeRefreshToken(existingToken.id);

        throw new UnauthorizedError("Session expirée.", ErrorCodes.SESSION_EXPIRED);

    }

    if (existingToken.user.status !== "ACTIVE") {
        throw new ForbiddenError("Ce compte est désactivé.");
    }

    // Rotation (Document 13 Ch.6.3) : le token présenté est révoqué,
    // un nouveau est émis. idleExpiresAt repart pour 30 minutes,
    // absoluteExpiresAt est repris tel quel (jamais prolongé, Ch.6.7).
    await authRepository.revokeRefreshToken(existingToken.id);

    const accessToken = signAccessToken(existingToken.user);
    const newRawRefreshToken = generateRawToken();

    await authRepository.createRefreshToken({
        userId: existingToken.userId,
        tokenHash: hashToken(newRawRefreshToken),
        idleExpiresAt: new Date(Date.now() + env.SESSION_IDLE_TIMEOUT_MINUTES * 60 * 1000),
        absoluteExpiresAt: existingToken.absoluteExpiresAt,
        userAgent: context?.userAgent,
        ipAddress: context?.ipAddress,
    });

    return { accessToken, rawRefreshToken: newRawRefreshToken };

}

async function logout(rawRefreshToken) {

    if (!rawRefreshToken) {
        return;
    }

    const tokenHash = hashToken(rawRefreshToken);
    const existingToken = await authRepository.findRefreshTokenByHash(tokenHash);

    if (existingToken && !existingToken.revokedAt) {
        await authRepository.revokeRefreshToken(existingToken.id);
    }

}

async function getCurrentUser(userId) {

    const user = await authRepository.findUserById(userId);

    if (!user) {
        throw new UnauthorizedError("Utilisateur introuvable.");
    }

    return toUserDto(user);

}

async function forgotPassword({ email }) {

    const user = await authRepository.findUserByEmail(email);

    // Ne jamais révéler si l'email existe ou non (évite l'énumération
    // de comptes) — le token n'est créé que si l'utilisateur existe,
    // mais la réponse reste identique dans tous les cas.
    if (user) {

        const rawToken = generateRawToken();

        await authRepository.createPasswordResetToken({
            userId: user.id,
            tokenHash: hashToken(rawToken),
            expiresAt: new Date(Date.now() + RESET_TOKEN_TTL_MS),
        });

        // TODO: envoyer l'email de réinitialisation (Document 13 Ch.11).

    }

}

async function resetPassword({ token, password }) {

    const tokenHash = hashToken(token);
    const resetToken = await authRepository.findPasswordResetTokenByHash(tokenHash);

    const isInvalid =
        !resetToken ||
        resetToken.usedAt ||
        new Date() > resetToken.expiresAt;

    if (isInvalid) {
        throw new ValidationError("Ce lien de réinitialisation est invalide ou expiré.");
    }

    const passwordHash = await hashPassword(password);

    await authRepository.updateUserPassword(resetToken.userId, passwordHash);
    await authRepository.markPasswordResetTokenUsed(resetToken.id);

    // Toutes les sessions existantes sont révoquées après un
    // changement de mot de passe — bonne pratique de sécurité standard.
    await authRepository.revokeAllUserRefreshTokens(resetToken.userId);

}

async function verifyEmail({ token }) {

    const tokenHash = hashToken(token);
    const verificationToken = await authRepository.findEmailVerificationTokenByHash(tokenHash);

    const isInvalid =
        !verificationToken ||
        verificationToken.usedAt ||
        new Date() > verificationToken.expiresAt;

    if (isInvalid) {
        throw new ValidationError("Ce lien de vérification est invalide ou expiré.");
    }

    await authRepository.markEmailVerified(verificationToken.userId);
    await authRepository.markEmailVerificationTokenUsed(verificationToken.id);

}

const authService = {
    login,
    register,
    refresh,
    logout,
    getCurrentUser,
    forgotPassword,
    resetPassword,
    verifyEmail,
};

export default authService;
