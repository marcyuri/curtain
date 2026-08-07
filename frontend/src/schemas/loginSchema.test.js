import { describe, it, expect } from "vitest";

import loginSchema from "./loginSchema";

describe("loginSchema", () => {

    it("valide un email et un mot de passe corrects", () => {

        const result = loginSchema.safeParse({
            email: "jean@example.com",
            password: "motdepasse",
        });

        expect(result.success).toBe(true);

    });

    it("rejette un email invalide", () => {

        const result = loginSchema.safeParse({
            email: "pas-un-email",
            password: "motdepasse",
        });

        expect(result.success).toBe(false);

    });

    it("rejette un mot de passe vide", () => {

        const result = loginSchema.safeParse({
            email: "jean@example.com",
            password: "",
        });

        expect(result.success).toBe(false);

    });

});
