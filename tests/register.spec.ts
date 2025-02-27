import { test, expect } from "@playwright/test";

// TEST AVEC GOOD USER
test("La page de formulaire de register doit se charger et vérifier le bon déroulement de la connexion", async ({
  page,
}) => {
  await page.goto("/register");
  // await page.pause();
  const headTitle = page.getByRole("heading", { name: "Inscription" });
  await expect(headTitle).toBeVisible();
  await page.getByTestId('register-username').fill("testPlaywright6");
  await page.getByTestId('register-email').fill("testPlaywright6@test.com");
  await page.getByTestId('register-password').fill("123Test");
  await page.getByTestId('register-password-confirm').fill("123Test");
  await page.getByRole("button", { name: "S'inscrire" }).click();
  await page.waitForURL('**/login');
  // Vérifie si le message d'erreur est présent
  // await expect(page.getByText("Erreur de connexion. Veuillez vérifier vos identifiants.")).toBeVisible();

});

// TEST AVEC WRONG USER
test("La page de formulaire de register doit se charger et afficher un message d'erreur", async ({
  page,
}) => {
  await page.goto("/register");
  // await page.pause();
  const headTitle = page.getByRole("heading", { name: "Inscription" });
  await expect(headTitle).toBeVisible();
  await page.getByTestId('register-username').fill("testPlaywright7");
  await page.getByTestId('register-email').fill("testPlaywright7@test.com");
  await page.getByTestId('register-password').fill("123Test");
  await page.getByTestId('register-password-confirm').fill("1234Test");
  await page.getByRole("button", { name: "S\'inscrire" }).click();
  // await page.pause();
  // Vérifie si le message d'erreur est présent
  await expect(page.getByText("Les mots de passe ne correspondent pas !")).toBeVisible();

});

