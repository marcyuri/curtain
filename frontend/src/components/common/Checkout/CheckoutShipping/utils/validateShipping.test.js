import { describe, it, expect } from "vitest";

import { validateShipping } from "./validateShipping";

describe("validateShipping", () => {

    it("échoue si aucun mode de livraison n'est sélectionné", () => {

        const result = validateShipping({ shippingMethod: null });

        expect(result).toBe("Veuillez sélectionner un mode de livraison.");

    });

    it("réussit si un mode de livraison est sélectionné", () => {

        const result = validateShipping({
            shippingMethod: { id: "standard", name: "Standard" },
        });

        expect(result).toBe("");

    });

});
