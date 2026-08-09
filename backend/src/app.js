import express from "express";

import env from "./config/env.js";
import prisma from "./config/database.js";

import requestLogger from "./middleware/requestLogger.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";

import routes from "./routes/index.js";
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

// Routes métier, versionnées sous env.API_PREFIX (Document 13 Ch.5.1).
app.use(routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
