import { describe, it, expect, vi } from "vitest";
import request from "supertest";

// Le healthcheck ne doit pas dépendre d'une base de données réellement
// migrée pour être testé (Document 13, Ch.13.6 — environnement de test
// isolé). Le client Prisma est mocké : ce test vérifie le comportement
// de l'endpoint et le format de réponse, pas la connectivité réseau
// réelle à PostgreSQL (qui relève d'un test d'intégration séparé, à
// exécuter avec une vraie base de test).

vi.mock("../../src/config/database.js", () => ({
    default: {
        $queryRaw: vi.fn(),
    },
}));

const { default: app } = await import("../../src/app.js");
const { default: prisma } = await import("../../src/config/database.js");

describe("GET /health", () => {

    it("répond 200 avec le format de réponse unique", async () => {

        prisma.$queryRaw.mockResolvedValueOnce([{ "?column?": 1 }]);

        const response = await request(app).get("/health");

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toHaveProperty("uptime");
        expect(response.body.data).toHaveProperty("environment");

    });

    it("rapporte database: connected quand Prisma répond", async () => {

        prisma.$queryRaw.mockResolvedValueOnce([{ "?column?": 1 }]);

        const response = await request(app).get("/health");

        expect(response.body.data.database).toBe("connected");

    });

    it("rapporte database: unreachable sans lever d'erreur quand Prisma échoue", async () => {

        prisma.$queryRaw.mockRejectedValueOnce(new Error("connection refused"));

        const response = await request(app).get("/health");

        expect(response.status).toBe(200);
        expect(response.body.data.database).toBe("unreachable");

    });

});

describe("Route inconnue", () => {

    it("répond 404 avec le format de réponse unique", async () => {

        const response = await request(app).get("/cette-route-nexiste-pas");

        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
        expect(response.body.code).toBe("NOT_FOUND");

    });

});
