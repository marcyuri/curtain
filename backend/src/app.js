import express from "express";

// Configuration Express minimale pour la Phase 0 — Étape 1.
// Volontairement réduit au strict nécessaire : ni validation d'environnement
// (config/env.js, Étape 2), ni connexion Prisma (Étape 3), ni middlewares
// transverses (errorHandler, requestLogger... Étape 4) à ce stade.

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {

    res.json({
        success: true,
        message: "LOVE CAN BUILD API — OK",
        data: {
            uptime: process.uptime(),
        },
    });

});

export default app;
