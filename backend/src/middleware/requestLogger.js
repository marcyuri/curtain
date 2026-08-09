import { randomUUID } from "node:crypto";

import pinoHttp from "pino-http";

import logger from "../config/logger.js";

// Journalisation structurée des requêtes (Document 13, Ch.10.4).
// Chaque requête reçoit un requestId propagé dans tous les logs qui en
// découlent, pour pouvoir suivre son parcours de bout en bout.
//
// Ne journalise jamais : mots de passe, tokens, données sensibles
// (Document 10 Ch.12) — redaction explicite des en-têtes/champs les
// plus à risque.

const requestLogger = pinoHttp({

    logger,

    genReqId: (req) => req.headers["x-request-id"] || randomUUID(),

    redact: {
        paths: [
            "req.headers.authorization",
            "req.headers.cookie",
            "req.body.password",
            "req.body.confirmPassword",
            "req.body.token",
        ],
        censor: "[REDACTED]",
    },

});

export default requestLogger;
