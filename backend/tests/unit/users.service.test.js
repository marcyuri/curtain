import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../src/modules/users/users.repository.js", () => ({
    default: {
        findMany: vi.fn(),
        findById: vi.fn(),
        findByEmail: vi.fn(),
        create: vi.fn(),
        updateById: vi.fn(),
        softDeleteById: vi.fn(),
        setRoles: vi.fn(),
    },
}));

vi.mock("../../src/shared/utils/hashPassword.js", () => ({
    hashPassword: vi.fn().mockResolvedValue("hashed-password"),
}));

vi.mock("../../src/config/database.js", () => ({
    default: {
        $transaction: vi.fn((callback) => callback({
            user: {
                create: vi.fn().mockResolvedValue({ id: "user-1" }),
                update: vi.fn(),
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
        })),
    },
}));

const { default: usersRepository } = await import("../../src/modules/users/users.repository.js");
const { hashPassword } = await import("../../src/shared/utils/hashPassword.js");
const { default: usersService } = await import("../../src/modules/users/users.service.js");

beforeEach(() => {
    vi.clearAllMocks();
});

describe("usersService.createUser", () => {

    it("lève une ConflictError si l'email existe déjà", async () => {

        usersRepository.findByEmail.mockResolvedValueOnce({ id: "existing-user" });

        await expect(
            usersService.createUser({
                email: "jean@example.com",
                password: "motdepasse123",
                firstName: "Jean",
                lastName: "Dupont",
                roleIds: [],
            })
        ).rejects.toThrow("Un compte existe déjà avec cet email.");

    });

    it("hache le mot de passe avant de créer l'utilisateur", async () => {

        usersRepository.findByEmail.mockResolvedValueOnce(null);

        await usersService.createUser({
            email: "jean@example.com",
            password: "motdepasse123",
            firstName: "Jean",
            lastName: "Dupont",
            roleIds: [],
        });

        expect(hashPassword).toHaveBeenCalledWith("motdepasse123");

    });

    it("ne renvoie jamais passwordHash dans le résultat", async () => {

        usersRepository.findByEmail.mockResolvedValueOnce(null);

        const result = await usersService.createUser({
            email: "jean@example.com",
            password: "motdepasse123",
            firstName: "Jean",
            lastName: "Dupont",
            roleIds: [],
        });

        expect(result).not.toHaveProperty("passwordHash");
        expect(result).not.toHaveProperty("password");

    });

});

describe("usersService.getUserById", () => {

    it("lève une NotFoundError si l'utilisateur n'existe pas", async () => {

        usersRepository.findById.mockResolvedValueOnce(null);

        await expect(usersService.getUserById("id-inexistant")).rejects.toThrow(
            "Utilisateur introuvable."
        );

    });

});

describe("usersService.deleteUser", () => {

    it("lève une NotFoundError si l'utilisateur n'existe pas", async () => {

        usersRepository.findById.mockResolvedValueOnce(null);

        await expect(usersService.deleteUser("id-inexistant")).rejects.toThrow(
            "Utilisateur introuvable."
        );

    });

    it("empêche un utilisateur de supprimer son propre compte", async () => {

        usersRepository.findById.mockResolvedValueOnce({ id: "user-1" });

        await expect(
            usersService.deleteUser("user-1", { requestingUserId: "user-1" })
        ).rejects.toThrow("Vous ne pouvez pas supprimer votre propre compte.");

    });

    it("supprime (soft delete) un autre utilisateur normalement", async () => {

        usersRepository.findById.mockResolvedValueOnce({ id: "user-2" });

        await usersService.deleteUser("user-2", { requestingUserId: "user-1" });

        expect(usersRepository.softDeleteById).toHaveBeenCalledWith("user-2");

    });

});
