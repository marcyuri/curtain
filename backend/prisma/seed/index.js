import prisma from "../../src/config/database.js";
import { seedPermissions } from "./seedPermissions.js";
import { seedRoles } from "./seedRoles.js";
import { seedUsers } from "./seedUsers.js";

// Ordre strict imposé par les dépendances de clé étrangère
// (Document 13 Ch.4.6) : permissions -> rôles -> utilisateurs.

async function main() {

    console.log("🌱 Seed de la base de données...");

    await seedPermissions(prisma);
    await seedRoles(prisma);
    await seedUsers(prisma);

    console.log("✅ Seed terminé.");

}

main()
    .catch((error) => {

        console.error("❌ Échec du seed :", error);
        process.exitCode = 1;

    })
    .finally(async () => {

        await prisma.$disconnect();

    });
