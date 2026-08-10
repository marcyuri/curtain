import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../src/modules/auth/auth.repository.js", () => ({
    default: {
        findUserByEmail: vi.fn(),
        findUserById: vi.fn(),
        updateUserPassword: vi.fn(),
        markEmailVerified: vi.fn(),
        createRefreshToken: vi.fn(),
        findRefreshTokenByHash: vi.fn(),
        revokeRefreshToken: vi.fn(),
        revokeAllUserRefreshTokens: vi.fn(),
        createPasswordResetToken: vi.fn(),
        findPasswordResetTokenByHash: vi.fn(),
        markPasswordResetTokenUsed: vi.fn(),
        createEmailVerificationToken: vi.fn(),
        findEmailVerificationTokenByHash: vi.fn(),
        markEmailVerificationTokenUsed: vi.fn(),
    },
}));

vi.mock("../../src/shared/utils/hashPassword.js", () => ({
    hashPassword: vi.fn().mockResolvedValue("hashed-password"),
    verifyPassword: vi.fn(),
}));

vi.mock("../../src/config/database.js", () => ({
    default: {
        role: { findUnique: vi.fn().mockResolvedValue({ id: "role-customer" }) },
        $transaction: vi.fn((callback) => callback({
            user: {
                create: vi.fn().mockResolvedValue({ id: "user-1" }),
                findFirst: vi.fn().mockResolvedValue({
                    id: "user-1",
                    email: "jean@example.com",
                    firstName: "Jean",
                    lastName: "Dupont",
                    phone: null,
                    avatar: null,
                    status: "ACTIVE",
                    language: "fr",
                    timezone: "Africa/Douala",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    roles: [],
                }),
            },
            userRole: { create: vi.fn() },
        })),
    },
}));

const { default: authRepository } = await import("../../src/modules/auth/auth.repository.js");
const { verifyPassword } = await import("../../src/shared/utils/hashPassword.js");
const { default: authService } = await import("../../src/modules/auth/auth.service.js");

function buildUser(overrides = {}) {

    return {
        id: "user-1",
        email: "jean@example.com",
        passwordHash: "hashed",
        status: "ACTIVE",
        firstName: "Jean",
        lastName: "Dupont",
        phone: null,
        avatar: null,
        language: "fr",
        timezone: "Africa/Douala",
        createdAt: new Date(),
        updatedAt: new Date(),
        roles: [],
        ...overrides,
    };

}

beforeEach(() => {
    vi.clearAllMocks();
});

describe("authService.login", () => {

    it("rejette un email inconnu sans révéler s'il existe", async () => {

        authRepository.findUserByEmail.mockResolvedValueOnce(null);

        await expect(
            authService.login({ email: "inconnu@example.com", password: "x" })
        ).rejects.toThrow("Email ou mot de passe incorrect.");

    });

    it("rejette un mot de passe incorrect avec le même message que l'email inconnu", async () => {

        authRepository.findUserByEmail.mockResolvedValueOnce(buildUser());
        verifyPassword.mockResolvedValueOnce(false);

        await expect(
            authService.login({ email: "jean@example.com", password: "mauvais" })
        ).rejects.toThrow("Email ou mot de passe incorrect.");

    });

    it("rejette un compte désactivé même avec le bon mot de passe", async () => {

        authRepository.findUserByEmail.mockResolvedValueOnce(buildUser({ status: "SUSPENDED" }));
        verifyPassword.mockResolvedValueOnce(true);

        await expect(
            authService.login({ email: "jean@example.com", password: "bon" })
        ).rejects.toThrow("Ce compte est désactivé.");

    });

    it("émet un access token et un refresh token pour des identifiants valides", async () => {

        authRepository.findUserByEmail.mockResolvedValueOnce(buildUser());
        verifyPassword.mockResolvedValueOnce(true);

        const result = await authService.login({ email: "jean@example.com", password: "bon" });

        expect(result.accessToken).toBeTypeOf("string");
        expect(result.rawRefreshToken).toBeTypeOf("string");
        expect(result.user.email).toBe("jean@example.com");
        expect(authRepository.createRefreshToken).toHaveBeenCalledOnce();

    });

});

describe("authService.register", () => {

    it("lève une ConflictError si l'email existe déjà", async () => {

        authRepository.findUserByEmail.mockResolvedValueOnce(buildUser());

        await expect(
            authService.register({
                email: "jean@example.com",
                password: "motdepasse123",
                firstName: "Jean",
                lastName: "Dupont",
            })
        ).rejects.toThrow("Un compte existe déjà avec cet email.");

    });

    it("crée un token de vérification d'email à l'inscription", async () => {

        authRepository.findUserByEmail.mockResolvedValueOnce(null);

        await authService.register({
            email: "jean@example.com",
            password: "motdepasse123",
            firstName: "Jean",
            lastName: "Dupont",
        });

        expect(authRepository.createEmailVerificationToken).toHaveBeenCalledOnce();

    });

});

describe("authService.refresh (session glissante, Document 13 Ch.6.7)", () => {

    it("rejette une requête sans token", async () => {

        await expect(authService.refresh(undefined)).rejects.toThrow("Session absente.");

    });

    it("rejette un token inconnu", async () => {

        authRepository.findRefreshTokenByHash.mockResolvedValueOnce(null);

        await expect(authService.refresh("token-inconnu")).rejects.toThrow("Session invalide.");

    });

    it("révoque toutes les sessions si un token déjà révoqué est réutilisé (détection de vol)", async () => {

        authRepository.findRefreshTokenByHash.mockResolvedValueOnce({
            id: "rt-1",
            userId: "user-1",
            revokedAt: new Date(),
            idleExpiresAt: new Date(Date.now() + 10 * 60 * 1000),
            absoluteExpiresAt: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
            user: buildUser(),
        });

        await expect(authService.refresh("token-deja-utilise")).rejects.toThrow(
            "Session invalide, reconnexion requise."
        );

        expect(authRepository.revokeAllUserRefreshTokens).toHaveBeenCalledWith("user-1");

    });

    it("rejette un token dont la fenêtre d'inactivité de 30 minutes est dépassée", async () => {

        authRepository.findRefreshTokenByHash.mockResolvedValueOnce({
            id: "rt-1",
            userId: "user-1",
            revokedAt: null,
            idleExpiresAt: new Date(Date.now() - 1000), // déjà dépassé
            absoluteExpiresAt: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
            user: buildUser(),
        });

        await expect(authService.refresh("token-inactif")).rejects.toThrow("Session expirée.");

    });

    it("rejette un token dont le plafond absolu de 30 jours est dépassé", async () => {

        authRepository.findRefreshTokenByHash.mockResolvedValueOnce({
            id: "rt-1",
            userId: "user-1",
            revokedAt: null,
            idleExpiresAt: new Date(Date.now() + 10 * 60 * 1000),
            absoluteExpiresAt: new Date(Date.now() - 1000), // déjà dépassé
            user: buildUser(),
        });

        await expect(authService.refresh("token-trop-vieux")).rejects.toThrow("Session expirée.");

    });

    it("effectue la rotation et conserve absoluteExpiresAt inchangé pour un token valide", async () => {

        const absoluteExpiresAt = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000);

        authRepository.findRefreshTokenByHash.mockResolvedValueOnce({
            id: "rt-1",
            userId: "user-1",
            revokedAt: null,
            idleExpiresAt: new Date(Date.now() + 10 * 60 * 1000),
            absoluteExpiresAt,
            user: buildUser(),
        });

        const result = await authService.refresh("token-valide");

        expect(result.accessToken).toBeTypeOf("string");
        expect(authRepository.revokeRefreshToken).toHaveBeenCalledWith("rt-1");

        const createCall = authRepository.createRefreshToken.mock.calls[0][0];

        expect(createCall.absoluteExpiresAt).toEqual(absoluteExpiresAt);

    });

});

describe("authService.resetPassword", () => {

    it("rejette un token invalide ou expiré", async () => {

        authRepository.findPasswordResetTokenByHash.mockResolvedValueOnce(null);

        await expect(
            authService.resetPassword({ token: "invalide", password: "motdepasse123" })
        ).rejects.toThrow("Ce lien de réinitialisation est invalide ou expiré.");

    });

    it("révoque toutes les sessions après un changement de mot de passe réussi", async () => {

        authRepository.findPasswordResetTokenByHash.mockResolvedValueOnce({
            id: "prt-1",
            userId: "user-1",
            usedAt: null,
            expiresAt: new Date(Date.now() + 10 * 60 * 1000),
        });

        await authService.resetPassword({ token: "valide", password: "nouveaumotdepasse" });

        expect(authRepository.revokeAllUserRefreshTokens).toHaveBeenCalledWith("user-1");

    });

});
