import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";

import env from "./config/env.js";
import prisma from "./config/database.js";

import requestLogger from "./middleware/requestLogger.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";

import routes from "./routes/index.js";
import { success } from "./shared/utils/apiResponse.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(requestLogger);
app.use(express.json());
app.use(cookieParser());

// credentials: true est requis pour que le navigateur envoie le
// cookie httpOnly du Refresh Token (Document 13 Ch.6.1) lors des
// requêtes cross-origin depuis le Frontend.
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));

// Sert les fichiers uploadés localement (Document 13 Ch.11.1,
// LocalStorageProvider) — pertinent uniquement en développement ;
// STORAGE_DRIVER=s3 sert directement depuis S3 en production, cette
// route devient alors inutile mais reste inoffensive.
app.use("/uploads", express.static(path.resolve(__dirname, "../uploads")));

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
