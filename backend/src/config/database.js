import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

import env from "./env.js";

// Prisma 7 nécessite un driver adapter pour PostgreSQL.
// DATABASE_URL reste validée une seule fois par env.js, qui demeure
// la source unique de vérité des variables d'environnement.

const adapter = new PrismaPg({
    connectionString: env.DATABASE_URL,
});

// Instance Prisma unique, partagée par tous les repositories.
// Une seule instance pour toute l'application, jamais une par module.

const prisma = new PrismaClient({
    adapter,
    log: env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
});

export default prisma;