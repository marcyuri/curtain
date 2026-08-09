import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../src/modules/roles/roles.repository.js", () => ({
    default: {
        findMany: vi.fn(),
        findById: vi.fn(),
        findByKey: vi.fn(),
        create: vi.fn(),
        updateById: vi.fn(),
        deleteById: vi.fn(),
        setPermissions: vi.fn(),
    },
}));

vi.mock("../../src/config/database.js", () => ({
    default: {
        $transaction: vi.fn((callback) => callback({
            role: {
                create: vi.fn().mockResolvedValue({ id: "role-1" }),
                update: vi.fn(),
                findUnique: vi.fn().mockResolvedValue({
                    id: "role-1",
                    key: "MANAGER",
                    label: "Manager",
                    description: null,
                    permissions: [],
                }),
            },
        })),
        userRole: {
            count: vi.fn(),
        },
    },
}));

const { default: rolesRepository } = await import("../../src/modules/roles/roles.repository.js");
const { default: prisma } = await import("../../src/config/database.js");
const { default: rolesService } = await import("../../src/modules/roles/roles.service.js");

beforeEach(() => {
    vi.clearAllMocks();
});

describe("rolesService.getRoleById", () => {

    it("lève une NotFoundError si le rôle n'existe pas", async () => {

        rolesRepository.findById.mockResolvedValueOnce(null);

        await expect(rolesService.getRoleById("id-inexistant")).rejects.toThrow(
            "Rôle introuvable."
        );

    });

    it("retourne le rôle transformé en DTO s'il existe", async () => {

        rolesRepository.findById.mockResolvedValueOnce({
            id: "role-1",
            key: "MANAGER",
            label: "Manager",
            description: null,
            permissions: [],
        });

        const result = await rolesService.getRoleById("role-1");

        expect(result.key).toBe("MANAGER");

    });

});

describe("rolesService.createRole", () => {

    it("lève une ConflictError si la clé existe déjà", async () => {

        rolesRepository.findByKey.mockResolvedValueOnce({ id: "existing-role" });

        await expect(
            rolesService.createRole({ key: "MANAGER", label: "Manager", permissionIds: [] })
        ).rejects.toThrow("Un rôle avec la clé 'MANAGER' existe déjà.");

    });

    it("crée le rôle si la clé est disponible", async () => {

        rolesRepository.findByKey.mockResolvedValueOnce(null);

        const result = await rolesService.createRole({
            key: "MANAGER",
            label: "Manager",
            permissionIds: [],
        });

        expect(result.key).toBe("MANAGER");

    });

});

describe("rolesService.deleteRole", () => {

    it("lève une NotFoundError si le rôle n'existe pas", async () => {

        rolesRepository.findById.mockResolvedValueOnce(null);

        await expect(rolesService.deleteRole("id-inexistant")).rejects.toThrow(
            "Rôle introuvable."
        );

    });

    it("lève une ConflictError si des utilisateurs utilisent encore ce rôle", async () => {

        rolesRepository.findById.mockResolvedValueOnce({ id: "role-1" });
        prisma.userRole.count.mockResolvedValueOnce(3);

        await expect(rolesService.deleteRole("role-1")).rejects.toThrow(
            "Impossible de supprimer ce rôle : 3 utilisateur(s) l'utilisent encore."
        );

    });

    it("supprime le rôle si personne ne l'utilise", async () => {

        rolesRepository.findById.mockResolvedValueOnce({ id: "role-1" });
        prisma.userRole.count.mockResolvedValueOnce(0);

        await rolesService.deleteRole("role-1");

        expect(rolesRepository.deleteById).toHaveBeenCalledWith("role-1");

    });

});
