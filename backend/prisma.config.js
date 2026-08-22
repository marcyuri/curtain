import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({

    schema: "prisma/schema.prisma",

    migrations: {
        path: "prisma/migrations",
    },

    datasource: {
        // Une valeur vide permet à `prisma generate` de fonctionner
        // pendant le build. Les commandes qui se connectent réellement
        // à PostgreSQL nécessitent ensuite DATABASE_URL.
        url: process.env.DATABASE_URL ?? "",
    },

});