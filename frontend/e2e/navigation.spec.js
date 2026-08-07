import { test, expect } from "@playwright/test";

test.describe("Navigation publique", () => {

    test("la page d'accueil se charge", async ({ page }) => {

        await page.goto("/");

        await expect(page).toHaveTitle(/LOVE CAN BUILD/i);

    });

    test("la navbar permet d'atteindre la page Contact", async ({ page }) => {

        await page.goto("/");

        await page.getByRole("link", { name: /contact/i }).click();

        await expect(page).toHaveURL(/\/contact/);

    });

    test("une route inconnue affiche la page 404", async ({ page }) => {

        await page.goto("/route-qui-nexiste-pas");

        await expect(page.getByText(/page introuvable/i)).toBeVisible();

    });

});

test.describe("Authentification", () => {

    test("le formulaire de connexion affiche des erreurs de validation", async ({ page }) => {

        await page.goto("/login");

        await page.getByRole("button", { name: /se connecter/i }).click();

        await expect(page.getByText(/l'email est requis/i)).toBeVisible();

    });

});
