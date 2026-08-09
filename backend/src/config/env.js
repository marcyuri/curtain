import "dotenv/config";
import { z } from "zod";

// Source unique de vérité pour les variables d'environnement
// (Document 13, Chapitre 12). Validées une seule fois, au démarrage :
// si une variable obligatoire manque ou a un format invalide, le
// serveur refuse de démarrer (Document 10, principe Fail Secure)
// plutôt que d'échouer silencieusement ou tardivement en production.
//
// Ce schéma ne couvre, à ce stade (Étape 2), que ce qui est réellement
// consommé par l'application. Les variables des étapes suivantes
// (DATABASE_URL à l'Étape 3, JWT_* à la Phase 1, etc.) seront ajoutées
// au fur et à mesure, jamais par anticipation.

const envSchema = z.object({

    NODE_ENV: z
        .enum(["development", "test", "production"])
        .default("development"),

    PORT: z.coerce
        .number()
        .int()
        .positive()
        .default(4000),

    API_PREFIX: z
        .string()
        .startsWith("/")
        .default("/api/v1"),

    DATABASE_URL: z
        .string()
        .min(1, "DATABASE_URL est requis.")
        .startsWith("postgresql://", "DATABASE_URL doit être une URL PostgreSQL."),

});

function loadEnv() {

    const result = envSchema.safeParse(process.env);

    if (!result.success) {

        console.error("❌ Variables d'environnement invalides :");

        for (const issue of result.error.issues) {
            console.error(`   - ${issue.path.join(".")} : ${issue.message}`);
        }

        process.exit(1);

    }

    return result.data;

}

const env = loadEnv();

export default env;
