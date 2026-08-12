import "dotenv/config";
import { z } from "zod";

// Source unique de vérité pour les variables d'environnement
// (Document 13, Chapitre 12). Validées une seule fois, au démarrage :
// si une variable obligatoire manque ou a un format invalide, le
// serveur refuse de démarrer (Document 10, principe Fail Secure)
// plutôt que d'échouer silencieusement ou tardivement en production.
//
// Ce schéma couvre l'application (Étape 2), la connexion base de
// données (Étape 3) et l'authentification JWT (Phase 1, Étape 8).
// Les variables des phases suivantes (STORAGE_*/SMTP_* etc.) seront
// ajoutées au fur et à mesure, jamais par anticipation.

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

    LOG_LEVEL: z
        .enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"])
        .default("info"),

    // Document 13, Ch.6.1 — deux secrets distincts, jamais le même,
    // jamais codés en dur, jamais commités.
    JWT_ACCESS_SECRET: z
        .string()
        .min(32, "JWT_ACCESS_SECRET doit contenir au moins 32 caractères."),

    JWT_ACCESS_EXPIRES_IN: z.string().default("15m"),

    JWT_REFRESH_SECRET: z
        .string()
        .min(32, "JWT_REFRESH_SECRET doit contenir au moins 32 caractères."),

    JWT_REFRESH_EXPIRES_IN_DAYS: z.coerce.number().int().positive().default(30),

    // Document 13, Ch.6.7 — fenêtre glissante d'inactivité.
    SESSION_IDLE_TIMEOUT_MINUTES: z.coerce.number().int().positive().default(30),

    CORS_ORIGIN: z.string().default("http://localhost:5173"),

    // Document 13, Ch.10/11.1 — stockage local en développement,
    // compatible S3 en production. Les variables S3_* ne sont exigées
    // que si STORAGE_DRIVER=s3 (voir le .refine() ci-dessous).
    STORAGE_DRIVER: z.enum(["local", "s3"]).default("local"),
    S3_BUCKET: z.string().optional(),
    S3_REGION: z.string().optional(),
    MAX_UPLOAD_SIZE_MB: z.coerce.number().int().positive().default(10),

}).refine(
    (data) => data.STORAGE_DRIVER !== "s3" || (data.S3_BUCKET && data.S3_REGION),
    {
        message: "S3_BUCKET et S3_REGION sont requis quand STORAGE_DRIVER=s3.",
        path: ["S3_BUCKET"],
    }
);

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
