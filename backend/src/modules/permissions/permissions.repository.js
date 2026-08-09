import prisma from "../../config/database.js";

// Seul fichier autorisé à appeler Prisma pour ce module (Document 13,
// Ch.3.2). Aucune règle métier ici.

async function findMany() {

    return prisma.permission.findMany({
        orderBy: [{ module: "asc" }, { key: "asc" }],
    });

}

async function findByKey(key) {

    return prisma.permission.findUnique({
        where: { key },
    });

}

const permissionsRepository = {
    findMany,
    findByKey,
};

export default permissionsRepository;
