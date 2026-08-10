import prisma from "../../config/database.js";

// Seul fichier autorisé à appeler Prisma pour ce module (Document 13,
// Ch.3.2). Le soft delete (deletedAt) est appliqué systématiquement :
// aucune requête de lecture ne renvoie un utilisateur supprimé
// (Document 12 Frontend Ch.13 — les suppressions brutales sont
// interdites, transposé côté Backend).

async function findMany({ page, limit, search }) {

    const where = {
        deletedAt: null,
        ...(search && {
            OR: [
                { email: { contains: search, mode: "insensitive" } },
                { firstName: { contains: search, mode: "insensitive" } },
                { lastName: { contains: search, mode: "insensitive" } },
            ],
        }),
    };

    const [users, total] = await Promise.all([
        prisma.user.findMany({
            where,
            include: { roles: { include: { role: true } } },
            skip: (page - 1) * limit,
            take: limit,
            orderBy: { createdAt: "desc" },
        }),
        prisma.user.count({ where }),
    ]);

    return { users, total };

}

async function findById(id) {

    return prisma.user.findFirst({
        where: { id, deletedAt: null },
        include: { roles: { include: { role: true } } },
    });

}

async function findByEmail(email) {

    return prisma.user.findFirst({
        where: { email, deletedAt: null },
    });

}

async function create(data) {

    return prisma.user.create({ data });

}

async function updateById(id, data) {

    return prisma.user.update({
        where: { id },
        data,
    });

}

async function softDeleteById(id) {

    return prisma.user.update({
        where: { id },
        data: { deletedAt: new Date() },
    });

}

async function setRoles(userId, roleIds, tx = prisma) {

    await tx.userRole.deleteMany({ where: { userId } });

    if (roleIds.length === 0) {
        return;
    }

    await tx.userRole.createMany({
        data: roleIds.map((roleId) => ({ userId, roleId })),
    });

}

const usersRepository = {
    findMany,
    findById,
    findByEmail,
    create,
    updateById,
    softDeleteById,
    setRoles,
};

export default usersRepository;
