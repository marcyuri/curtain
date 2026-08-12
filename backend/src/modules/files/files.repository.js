import prisma from "../../config/database.js";

async function create(data) {

    return prisma.file.create({ data });

}

async function findById(id) {

    return prisma.file.findUnique({ where: { id } });

}

async function deleteById(id) {

    return prisma.file.delete({ where: { id } });

}

const filesRepository = {
    create,
    findById,
    deleteById,
};

export default filesRepository;
