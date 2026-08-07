import app from "./app.js";

// Point d'entrée du serveur (Document 13, Ch.2).
// PORT lu directement depuis process.env pour cette première étape —
// sera remplacé par config/env.js (validation Zod complète) à l'Étape 2.

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {

    // TODO: remplacer par Pino (Document 13 Ch.1) dès son installation.
    // eslint-disable-next-line no-console
    console.log(`LOVE CAN BUILD API démarrée sur le port ${PORT}`);

});
