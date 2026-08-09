import express from "express";

import env from "./config/env.js";
import prisma from "./config/database.js";

// Configuration Express.
// Étape 4 (middlewares transverses : errorHandler, requestLogger,
// format de réponse unique) et suivantes restent à venir.

const app = express();

app.use(express.json());

// Le healthcheck reste volontairement hors du préfixe de version
// (Document 07 Ch.19 — le versionnement /api/v1 s'applique aux routes
// métier ; un healthcheck est une préoccupation d'infrastructure,
// consommée par des outils de supervision qui ne doivent pas changer
// de chemin à chaque montée de version de l'API).
app.get("/health", async (req, res) => {

    let databaseStatus;

    try {

        await prisma.$queryRaw`SELECT 1`;
        databaseStatus = "connected";

    } catch {

        databaseStatus = "unreachable";

    }

    res.json({
        success: true,
        message: "LOVE CAN BUILD API — OK",
        data: {
            uptime: process.uptime(),
            environment: env.NODE_ENV,
            database: databaseStatus,
        },
    });

});

export default app;
