import prisma from "../../config/database.js";

async function findMany() {

    return prisma.role.findMany({
        include: { permissions: { include: { permission: true } } },
        orderBy: { key: "asc" },
    });

}

async function findById(id) {

    return prisma.role.findUnique({
        where: { id },
        include: { permissions: { include: { permission: true } } },
    });

}

async function findByKey(key) {

    return prisma.role.findUnique({
        where: { key },
    });

}

async function create({ key, label, description }) {

    return prisma.role.create({
        data: { key, label, description },
    });

}

async function updateById(id, { label, description }) {

    return prisma.role.update({
        where: { id },
        data: { label, description },
    });

}

async function deleteById(id) {

    return prisma.role.delete({
        where: { id },
    });

}

async function setPermissions(roleId, permissionIds, tx = prisma) {

    await tx.rolePermission.deleteMany({ where: { roleId } });

    if (permissionIds.length === 0) {
        return;
    }

    await tx.rolePermission.createMany({
        data: permissionIds.map((permissionId) => ({ roleId, permissionId })),
    });

}

const rolesRepository = {
    findMany,
    findById,
    findByKey,
    create,
    updateById,
    deleteById,
    setPermissions,
};

export default rolesRepository;
