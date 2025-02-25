import { test, expect } from "@playwright/test";



// TEST AVEC USER CONNECTE
test("La page de formulaire d'ajout de bar doit se charger et afficher les bons éléments", async ({
  page,
}) => {
  // Connexion
  await page.goto("/login");
  const headTitle = page.getByRole("heading", { name: "Connexion" });
  await expect(headTitle).toBeVisible();
  await page.getByTestId('login-name').fill("testUser");
  await page.getByTestId('login-pwd').fill("123Soleil");
  await page.getByRole("button", { name: "Se connecter" }).click();
  await page.goto("/bar-form");
  const barFormTitle = page.getByRole("heading", { name: "Ajouter un Bar" });
  await expect(barFormTitle).toBeVisible();

  await page.getByTestId('bar-form-name').fill("Bar Test");
  await page.getByTestId('bar-form-description').fill("Bar description");
  await page.getByTestId('bar-form-happy-hour').fill("17h 20h");
  await page.getByTestId('bar-form-latitude').fill("45.750000");
  await page.getByTestId('bar-form-longitude').fill("4.850000");
  await page.getByRole("button", { name: "Ajouter" }).click();
  await page.goto("/event-form");
  const eventFormTitle = page.getByRole("heading", { name: "Ajouter un Event" });
  await expect(eventFormTitle).toBeVisible();

  await page.getByTestId('event-form-title').fill("Event Test");
  await page.getByTestId('event-form-description').fill("Event description");
  await page.pause();
  await page.getByTestId('event-form-time').fill("17h 20h");
  await page.getByTestId('bar-form-category').fill("Concerts");
  await page.getByTestId('bar-form-bar').fill("4.850000");
  await page.getByRole("button", { name: "Ajouter" }).click();
  await page.pause();
});

