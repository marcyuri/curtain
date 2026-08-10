import prisma from "../../config/database.js";

// Seul fichier autorisé à appeler Prisma pour ce module (Document 13,
// Ch.3.2).

const FULL_PERMISSIONS_INCLUDE = {
    roles: {
        include: {
            role: {
                include: {
                    permissions: { include: { permission: true } },
                },
            },
        },
    },
};

async function findUserByEmail(email) {

    return prisma.user.findFirst({
        where: { email, deletedAt: null },
        include: FULL_PERMISSIONS_INCLUDE,
    });

}

async function findUserById(id) {

    return prisma.user.findFirst({
        where: { id, deletedAt: null },
        include: FULL_PERMISSIONS_INCLUDE,
    });

}

async function updateUserPassword(userId, passwordHash) {

    return prisma.user.update({
        where: { id: userId },
        data: { passwordHash },
    });

}

async function markEmailVerified(userId) {

    return prisma.user.update({
        where: { id: userId },
        data: { emailVerifiedAt: new Date() },
    });

}

// ----- Refresh tokens (Document 13 Ch.6, session glissante Ch.6.7) -----

async function createRefreshToken(data) {

    return prisma.refreshToken.create({ data });

}

async function findRefreshTokenByHash(tokenHash) {

    return prisma.refreshToken.findUnique({
        where: { tokenHash },
        include: { user: { include: FULL_PERMISSIONS_INCLUDE } },
    });

}

async function revokeRefreshToken(id) {

    return prisma.refreshToken.update({
        where: { id },
        data: { revokedAt: new Date() },
    });

}

async function revokeAllUserRefreshTokens(userId) {

    return prisma.refreshToken.updateMany({
        where: { userId, revokedAt: null },
        data: { revokedAt: new Date() },
    });

}

// ----- Réinitialisation de mot de passe -----

async function createPasswordResetToken(data) {

    return prisma.passwordResetToken.create({ data });

}

async function findPasswordResetTokenByHash(tokenHash) {

    return prisma.passwordResetToken.findUnique({
        where: { tokenHash },
    });

}

async function markPasswordResetTokenUsed(id) {

    return prisma.passwordResetToken.update({
        where: { id },
        data: { usedAt: new Date() },
    });

}

// ----- Vérification d'email -----

async function createEmailVerificationToken(data) {

    return prisma.emailVerificationToken.create({ data });

}

async function findEmailVerificationTokenByHash(tokenHash) {

    return prisma.emailVerificationToken.findUnique({
        where: { tokenHash },
    });

}

async function markEmailVerificationTokenUsed(id) {

    return prisma.emailVerificationToken.update({
        where: { id },
        data: { usedAt: new Date() },
    });

}

const authRepository = {
    findUserByEmail,
    findUserById,
    updateUserPassword,
    markEmailVerified,
    createRefreshToken,
    findRefreshTokenByHash,
    revokeRefreshToken,
    revokeAllUserRefreshTokens,
    createPasswordResetToken,
    findPasswordResetTokenByHash,
    markPasswordResetTokenUsed,
    createEmailVerificationToken,
    findEmailVerificationTokenByHash,
    markEmailVerificationTokenUsed,
};

export default authRepository;
