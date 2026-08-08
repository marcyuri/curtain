import express from "express";

import env from "./config/env.js";

// Configuration Express. Étape 2 : la validation d'environnement
// (config/env.js) est maintenant en place. Toujours pas de connexion
// Prisma (Étape 3), ni de middlewares transverses (Étape 4).

const app = express();

app.use(express.json());

// Le healthcheck reste volontairement hors du préfixe de version
// (Document 07 Ch.19 — le versionnement /api/v1 s'applique aux routes
// métier ; un healthcheck est une préoccupation d'infrastructure,
// consommée par des outils de supervision qui ne doivent pas changer
// de chemin à chaque montée de version de l'API).
app.get("/health", (req, res) => {

    res.json({
        success: true,
        message: "LOVE CAN BUILD API — OK",
        data: {
            uptime: process.uptime(),
            environment: env.NODE_ENV,
        },
    });

});

export default app;
