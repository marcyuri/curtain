import prisma from "../../config/database.js";

async function findMany({ page, limit, search }) {

    const where = search
        ? { name: { contains: search, mode: "insensitive" } }
        : {};

    const [brands, total] = await Promise.all([
        prisma.brand.findMany({
            where,
            skip: (page - 1) * limit,
            take: limit,
            orderBy: { name: "asc" },
        }),
        prisma.brand.count({ where }),
    ]);

    return { brands, total };

}

async function findById(id) {

    return prisma.brand.findUnique({ where: { id } });

}

async function findBySlug(slug) {

    return prisma.brand.findUnique({ where: { slug } });

}

async function create(data) {

    return prisma.brand.create({ data });

}

async function updateById(id, data) {

    return prisma.brand.update({ where: { id }, data });

}

async function deleteById(id) {

    return prisma.brand.delete({ where: { id } });

}

const brandsRepository = {
    findMany,
    findById,
    findBySlug,
    create,
    updateById,
    deleteById,
};

export default brandsRepository;
