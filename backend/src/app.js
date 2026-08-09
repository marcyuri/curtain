import express from "express";

import env from "./config/env.js";
import prisma from "./config/database.js";

import requestLogger from "./middleware/requestLogger.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";

import { success } from "./shared/utils/apiResponse.js";

const app = express();

app.use(requestLogger);
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

    return success(res, {
        message: "LOVE CAN BUILD API — OK",
        data: {
            uptime: process.uptime(),
            environment: env.NODE_ENV,
            database: databaseStatus,
        },
    });

});

// Les routes métier (Document 13 Ch.2 — src/routes/) seront montées
// ici à partir de la Phase 1, sous le préfixe env.API_PREFIX.

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
