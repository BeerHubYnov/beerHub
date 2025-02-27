import { test, expect } from "@playwright/test";

// TEST AVEC GOOD USER
test("La page de formulaire de register doit se charger et vérifier le bon déroulement de la connexion", async ({
  page,
}) => {
  await page.goto("/register");
  const headTitle = page.getByRole("heading", { name: "Inscription" });
  await expect(headTitle).toBeVisible();
  await page.getByTestId('register-username').fill("testPlaywright727");
  await page.getByTestId('register-email').fill("testPlaywright727@test.com");
  await page.getByTestId('register-password').fill("123Test");
  await page.getByTestId('register-password-confirm').fill("123Test");
  await page.getByTestId('register-submit').click();

  

});

// TEST AVEC WRONG USER
test("La page de formulaire de register doit se charger et afficher un message d'erreur", async ({
  page,
}) => {
  await page.goto("/register");
  const headTitle = page.getByRole("heading", { name: "Inscription" });
  await expect(headTitle).toBeVisible();
  await page.getByTestId('register-username').fill("testPlaywright772");
  await page.getByTestId('register-email').fill("testPlaywright772@test.com");
  await page.getByTestId('register-password').fill("123Test");
  await page.getByTestId('register-password-confirm').fill("1234Test");
  await page.getByTestId('register-submit').click();

  
  // Vérifie si le message d'erreur est présent
  await expect(page.getByText("Les mots de passe ne correspondent pas !")).toBeVisible();

});

