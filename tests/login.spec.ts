import { test, expect } from "@playwright/test";

// TEST AVEC WRONG USER
test("La page de formulaire de login doit se charger et afficher un message d'erreur", async ({
  page,
}) => {
  await page.goto("/login");
  const headTitle = page.getByRole("heading", { name: "Connexion" });
  await expect(headTitle).toBeVisible();
  await page.getByTestId("login-name").fill("testUser");
  await page.getByTestId("login-pwd").fill("123Test");
  await page.getByRole("button", { name: "Se connecter" }).click();
  // Vérifie si le message d'erreur est présent
  await expect(
    page.getByText("Erreur de connexion. Veuillez vérifier vos identifiants.")
  ).toBeVisible();
});

// TEST LOGIN OK
test("La page de formulaire de login doit se charger et afficher les bons éléments", async ({
  page,
}) => {
  // Connexion
  await page.goto("/login");
  const headTitle = page.getByRole("heading", { name: "Connexion" });
  await expect(headTitle).toBeVisible();
  await page.getByTestId("login-name").fill("testUser");
  await page.getByTestId("login-pwd").fill("123Soleil");
  await page.getByRole("button", { name: "Se connecter" }).click();
  await page.waitForURL("**/");
});
