import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Button from "./Button";

describe("Button", () => {

    it("affiche son contenu", () => {

        render(<Button>Envoyer</Button>);

        expect(screen.getByText("Envoyer")).toBeInTheDocument();

    });

    it("appelle onClick au clic", async () => {

        const user = userEvent.setup();
        const handleClick = vi.fn();

        render(<Button onClick={handleClick}>Cliquer</Button>);

        await user.click(screen.getByRole("button", { name: "Cliquer" }));

        expect(handleClick).toHaveBeenCalledTimes(1);

    });

    it("est désactivé quand disabled est vrai", () => {

        render(<Button disabled>Envoyer</Button>);

        expect(screen.getByRole("button")).toBeDisabled();

    });

    it("est désactivé et affiche un spinner quand loading est vrai", () => {

        render(<Button loading>Envoyer</Button>);

        expect(screen.getByRole("button")).toBeDisabled();

    });

    it("n'appelle pas onClick quand disabled est vrai", async () => {

        const user = userEvent.setup();
        const handleClick = vi.fn();

        render(<Button disabled onClick={handleClick}>Envoyer</Button>);

        await user.click(screen.getByRole("button"));

        expect(handleClick).not.toHaveBeenCalled();

    });

});
