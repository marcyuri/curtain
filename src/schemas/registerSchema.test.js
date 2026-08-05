import { describe, it, expect } from "vitest";

import registerSchema from "./registerSchema";

const validPayload = {
    firstName: "Jean",
    lastName: "Dupont",
    phone: "",
    email: "jean@example.com",
    password: "motdepasse123",
    confirmPassword: "motdepasse123",
    acceptTerms: true,
};

describe("registerSchema", () => {

    it("valide un formulaire complet et correct", () => {

        const result = registerSchema.safeParse(validPayload);

        expect(result.success).toBe(true);

    });

    it("rejette si les mots de passe ne correspondent pas", () => {

        const result = registerSchema.safeParse({
            ...validPayload,
            confirmPassword: "autrepassword",
        });

        expect(result.success).toBe(false);

    });

    it("rejette un mot de passe trop court", () => {

        const result = registerSchema.safeParse({
            ...validPayload,
            password: "abc",
            confirmPassword: "abc",
        });

        expect(result.success).toBe(false);

    });

    it("rejette si les conditions ne sont pas acceptées", () => {

        const result = registerSchema.safeParse({
            ...validPayload,
            acceptTerms: false,
        });

        expect(result.success).toBe(false);

    });

});
