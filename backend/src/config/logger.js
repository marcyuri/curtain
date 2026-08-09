import pino from "pino";

import env from "./env.js";

// Instance Pino unique du projet (Document 13, Ch.2). Utilisée
// directement pour les logs applicatifs hors du cycle requête/réponse
// (démarrage du serveur, jobs...). Le logger par requête
// (middleware/requestLogger.js) crée son propre enfant contextualisé
// par requestId, mais partage la même configuration de base.

const logger = pino({

    level: env.LOG_LEVEL,

    transport:
        env.NODE_ENV === "development"
            ? { target: "pino-pretty", options: { colorize: true } }
            : undefined,

});

export default logger;
