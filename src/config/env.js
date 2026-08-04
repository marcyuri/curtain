// Source unique de vérité pour les variables d'environnement (Document 02).
// Jamais de logique métier ici, uniquement de la configuration.
//
// Toutes les variables consommées par le Frontend doivent être préfixées
// VITE_ dans le(s) fichier(s) .env pour être exposées par Vite.

const env = {

    apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000/api/v1",

    apiTimeout: 15000,

    appName: "LOVE CAN BUILD",

    isDevelopment: import.meta.env.DEV,

    isProduction: import.meta.env.PROD,

};

export default env;
