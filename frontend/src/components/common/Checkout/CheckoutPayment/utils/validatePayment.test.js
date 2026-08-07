import { describe, it, expect } from "vitest";

import { validatePayment } from "./validatePayment";

const basePayment = {
    paymentMethod: { id: "cash" },
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    mobileNumber: "",
    acceptTerms: true,
};

describe("validatePayment", () => {

    it("échoue si aucun moyen de paiement n'est sélectionné", () => {

        const result = validatePayment({ ...basePayment, paymentMethod: null });

        expect(result).toBe("Veuillez choisir un moyen de paiement.");

    });

    it("échoue si les informations de carte sont incomplètes", () => {

        const result = validatePayment({
            ...basePayment,
            paymentMethod: { id: "card" },
        });

        expect(result).toBe("Veuillez compléter les informations de votre carte.");

    });

    it("réussit avec une carte complète", () => {

        const result = validatePayment({
            ...basePayment,
            paymentMethod: { id: "card" },
            cardName: "Jean Dupont",
            cardNumber: "4242424242424242",
            expiry: "12/28",
            cvv: "123",
        });

        expect(result).toBe("");

    });

    it("échoue si le numéro mobile manque pour Orange Money", () => {

        const result = validatePayment({
            ...basePayment,
            paymentMethod: { id: "orange-money" },
        });

        expect(result).toBe("Veuillez renseigner votre numéro mobile.");

    });

    it("échoue si les conditions générales ne sont pas acceptées", () => {

        const result = validatePayment({ ...basePayment, acceptTerms: false });

        expect(result).toBe("Vous devez accepter les conditions générales.");

    });

    it("réussit pour un paiement à la livraison avec conditions acceptées", () => {

        const result = validatePayment(basePayment);

        expect(result).toBe("");

    });

});
