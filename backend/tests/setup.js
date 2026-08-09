// Silence les logs Pino pendant les tests (bruit inutile dans la
// sortie de npm run test) — appliqué avant tout import applicatif.

process.env.LOG_LEVEL = "silent";
