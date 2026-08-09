import rolesRepository from "./roles.repository.js";
import { toRoleDto, toRoleListDto } from "./roles.dto.js";
import { ConflictError } from "../../errors/ConflictError.js";
import { NotFoundError } from "../../errors/NotFoundError.js";
import { ErrorCodes } from "../../errors/errorCodes.js";
import prisma from "../../config/database.js";

async function listRoles() {

    const roles = await rolesRepository.findMany();

    return toRoleListDto(roles);

}

async function getRoleById(id) {

    const role = await rolesRepository.findById(id);

    if (!role) {
        throw new NotFoundError("Rôle introuvable.");
    }

    return toRoleDto(role);

}

async function createRole({ key, label, description, permissionIds }) {

    const existing = await rolesRepository.findByKey(key);

    if (existing) {
        throw new ConflictError(
            `Un rôle avec la clé '${key}' existe déjà.`,
            ErrorCodes.CONFLICT
        );
    }

    return prisma.$transaction(async (tx) => {

        const role = await tx.role.create({ data: { key, label, description } });

        await rolesRepository.setPermissions(role.id, permissionIds, tx);

        const created = await tx.role.findUnique({
            where: { id: role.id },
            include: { permissions: { include: { permission: true } } },
        });

        return toRoleDto(created);

    });

}

async function updateRole(id, { label, description, permissionIds }) {

    const existing = await rolesRepository.findById(id);

    if (!existing) {
        throw new NotFoundError("Rôle introuvable.");
    }

    return prisma.$transaction(async (tx) => {

        await tx.role.update({
            where: { id },
            data: { label, description },
        });

        if (permissionIds) {
            await rolesRepository.setPermissions(id, permissionIds, tx);
        }

        const updated = await tx.role.findUnique({
            where: { id },
            include: { permissions: { include: { permission: true } } },
        });

        return toRoleDto(updated);

    });

}

async function deleteRole(id) {

    const existing = await rolesRepository.findById(id);

    if (!existing) {
        throw new NotFoundError("Rôle introuvable.");
    }

    const usersWithRole = await prisma.userRole.count({ where: { roleId: id } });

    if (usersWithRole > 0) {
        throw new ConflictError(
            `Impossible de supprimer ce rôle : ${usersWithRole} utilisateur(s) l'utilisent encore.`,
            ErrorCodes.CONFLICT
        );
    }

    await rolesRepository.deleteById(id);

}

const rolesService = {
    listRoles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole,
};

export default rolesService;
