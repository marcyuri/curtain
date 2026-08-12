import prisma from "../../config/database.js";

async function findMany({ page, limit, search }) {

    const where = search
        ? { name: { contains: search, mode: "insensitive" } }
        : {};

    const [categories, total] = await Promise.all([
        prisma.category.findMany({
            where,
            skip: (page - 1) * limit,
            take: limit,
            orderBy: { name: "asc" },
        }),
        prisma.category.count({ where }),
    ]);

    return { categories, total };

}

async function findById(id) {

    return prisma.category.findUnique({ where: { id } });

}

async function findBySlug(slug) {

    return prisma.category.findUnique({ where: { slug } });

}

async function create(data) {

    return prisma.category.create({ data });

}

async function updateById(id, data) {

    return prisma.category.update({ where: { id }, data });

}

async function deleteById(id) {

    return prisma.category.delete({ where: { id } });

}

const categoriesRepository = {
    findMany,
    findById,
    findBySlug,
    create,
    updateById,
    deleteById,
};

export default categoriesRepository;
