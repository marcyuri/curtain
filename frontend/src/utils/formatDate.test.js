import { describe, it, expect } from "vitest";

import { getDayOfMonth, getMonthYearLabel } from "@utils/formatDate";

describe("formatDate", () => {

    describe("getDayOfMonth", () => {

        it("retourne le jour du mois sur 2 chiffres", () => {

            const date = new Date(2026, 7, 4); // 4 août 2026

            expect(getDayOfMonth(date)).toBe("04");

        });

        it("ne rajoute pas de zéro pour un jour à 2 chiffres", () => {

            const date = new Date(2026, 7, 21); // 21 août 2026

            expect(getDayOfMonth(date)).toBe("21");

        });

    });

    describe("getMonthYearLabel", () => {

        it("retourne le mois et l'année en français avec une majuscule", () => {

            const date = new Date(2026, 7, 4); // août 2026

            expect(getMonthYearLabel(date)).toBe("Août 2026");

        });

    });

});
