import { PrismaClient } from "@prisma/client";

import env from "./env.js";

// Instance Prisma unique, partagée par tous les repositories (Document
// 13 Ch.3.2 — seul un *.repository.js est autorisé à importer prisma).
// Une seule instance pour toute l'application, jamais une par module.

const prisma = new PrismaClient({
    log: env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
});

export default prisma;
