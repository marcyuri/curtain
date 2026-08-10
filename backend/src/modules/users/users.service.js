import usersRepository from "./users.repository.js";
import { toUserDto, toUserListDto } from "./users.dto.js";
import { hashPassword } from "../../shared/utils/hashPassword.js";
import { buildPaginationMeta } from "../../shared/utils/pagination.js";
import { NotFoundError } from "../../errors/NotFoundError.js";
import { ConflictError } from "../../errors/ConflictError.js";
import { ErrorCodes } from "../../errors/errorCodes.js";
import prisma from "../../config/database.js";

async function listUsers({ page, limit, search }) {

    const { users, total } = await usersRepository.findMany({ page, limit, search });

    return {
        users: toUserListDto(users),
        meta: buildPaginationMeta({ page, limit, total }),
    };

}

async function getUserById(id) {

    const user = await usersRepository.findById(id);

    if (!user) {
        throw new NotFoundError("Utilisateur introuvable.");
    }

    return toUserDto(user);

}

async function createUser({ email, password, firstName, lastName, phone, roleIds }) {

    const existing = await usersRepository.findByEmail(email);

    if (existing) {
        throw new ConflictError(
            "Un compte existe déjà avec cet email.",
            ErrorCodes.EMAIL_ALREADY_EXISTS
        );
    }

    const passwordHash = await hashPassword(password);

    return prisma.$transaction(async (tx) => {

        const user = await tx.user.create({
            data: { email, passwordHash, firstName, lastName, phone },
        });

        await usersRepository.setRoles(user.id, roleIds, tx);

        const created = await tx.user.findFirst({
            where: { id: user.id },
            include: { roles: { include: { role: true } } },
        });

        return toUserDto(created);

    });

}

async function updateUser(id, { roleIds, ...fields }) {

    const existing = await usersRepository.findById(id);

    if (!existing) {
        throw new NotFoundError("Utilisateur introuvable.");
    }

    return prisma.$transaction(async (tx) => {

        await tx.user.update({ where: { id }, data: fields });

        if (roleIds) {
            await usersRepository.setRoles(id, roleIds, tx);
        }

        const updated = await tx.user.findFirst({
            where: { id },
            include: { roles: { include: { role: true } } },
        });

        return toUserDto(updated);

    });

}

async function deleteUser(id, { requestingUserId } = {}) {

    const existing = await usersRepository.findById(id);

    if (!existing) {
        throw new NotFoundError("Utilisateur introuvable.");
    }

    if (requestingUserId && requestingUserId === id) {
        throw new ConflictError(
            "Vous ne pouvez pas supprimer votre propre compte.",
            ErrorCodes.CONFLICT
        );
    }

    await usersRepository.softDeleteById(id);

}

const usersService = {
    listUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};

export default usersService;
