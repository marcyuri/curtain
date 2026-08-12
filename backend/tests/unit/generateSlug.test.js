import { describe, it, expect } from "vitest";

import { generateSlug } from "../../src/shared/utils/generateSlug.js";

describe("generateSlug", () => {

    it("convertit en minuscules et remplace les espaces par des tirets", () => {

        expect(generateSlug("Chaussures de Sport")).toBe("chaussures-de-sport");

    });

    it("retire les accents", () => {

        expect(generateSlug("Électroménager")).toBe("electromenager");

    });

    it("retire les caractères spéciaux", () => {

        expect(generateSlug("T-shirt 100% coton !")).toBe("t-shirt-100-coton");

    });

    it("ne laisse pas de tiret en début ou fin de chaîne", () => {

        expect(generateSlug("  Sacs à main  ")).toBe("sacs-a-main");

    });

});
