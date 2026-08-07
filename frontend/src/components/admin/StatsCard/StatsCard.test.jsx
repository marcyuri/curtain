import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Package } from "lucide-react";

import StatsCard from "./StatsCard";

describe("StatsCard", () => {

    it("affiche le titre et la valeur", () => {

        render(
            <StatsCard
                title="Produits"
                value="248"
                icon={Package}
            />
        );

        expect(screen.getByText("Produits")).toBeInTheDocument();
        expect(screen.getByText("248")).toBeInTheDocument();

    });

    it("affiche la valeur absolue d'une tendance positive", () => {

        render(
            <StatsCard
                title="Commandes"
                value="156"
                icon={Package}
                trend={12}
            />
        );

        expect(screen.getByText("12%")).toBeInTheDocument();

    });

    it("affiche la valeur absolue d'une tendance négative", () => {

        render(
            <StatsCard
                title="Commandes"
                value="156"
                icon={Package}
                trend={-5}
            />
        );

        expect(screen.getByText("5%")).toBeInTheDocument();

    });

});
