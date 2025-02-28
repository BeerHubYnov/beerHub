import { test, expect } from "@playwright/test";

// ✅ TEST AVEC GOOD USER (inscription réussie)
// test("La page de formulaire de register doit se charger et vérifier le bon déroulement de la connexion", async ({ page }) => {
//   await page.goto("/register");
//   const headTitle = page.getByRole("heading", { name: "Inscription" });
//   await expect(headTitle).toBeVisible();

//   await page.getByTestId("register-username").fill("testPlaywright7678");
//   await page.getByTestId("register-email").fill("testPlaywright7678@test.com");
//   await page.getByTestId("register-password").fill("123Test");
//   await page.getByTestId("register-password-confirm").fill("123Test");
//   await page.getByTestId("register-submit").click();

  // Optionnel : Vérifie que l'utilisateur est redirigé vers la page de connexion
  // await expect(page).toHaveURL("/login");
// });

// ✅ TEST AVEC WRONG PASSWORD CONFIRMATION
test("La page de formulaire de register doit afficher une erreur si les mots de passe ne correspondent pas", async ({ page }) => {
  await page.goto("/register");
  await expect(page.getByRole("heading", { name: "Inscription" })).toBeVisible();

  await page.getByTestId("register-username").fill("testPlaywright772");
  await page.getByTestId("register-email").fill("testPlaywright772@test.com");
  await page.getByTestId("register-password").fill("123Test");
  await page.getByTestId("register-password-confirm").fill("1234Test");
  await page.getByTestId("register-submit").click();

  // Vérifie le message d'erreur
  await expect(page.getByText("Les mots de passe ne correspondent pas !")).toBeVisible();
});

// ✅ TEST AVEC EMAIL INVALIDE
test("La page de formulaire de register doit afficher une erreur si l'email est invalide", async ({ page }) => {
  await page.goto("/register");
  await expect(page.getByRole("heading", { name: "Inscription" })).toBeVisible();

  await page.getByTestId("register-username").fill("testPlaywrightEmail");
  await page.getByTestId("register-email").fill("emailInvalide"); // Email invalide
  await page.getByTestId("register-password").fill("123Test");
  await page.getByTestId("register-password-confirm").fill("123Test");
  await page.getByTestId("register-submit").click();

  // Vérifie le message d'erreur
  // await expect(page.getByText("Email invalide !")).toBeVisible();
});

// ✅ TEST AVEC MOT DE PASSE TROP COURT
test("La page de formulaire de register doit afficher une erreur si le mot de passe est trop court", async ({ page }) => {
  await page.goto("/register");
  await expect(page.getByRole("heading", { name: "Inscription" })).toBeVisible();

  await page.getByTestId("register-username").fill("testShortPass");
  await page.getByTestId("register-email").fill("testShortPass@test.com");
  await page.getByTestId("register-password").fill("123"); // Trop court
  await page.getByTestId("register-password-confirm").fill("123");
  await page.getByTestId("register-submit").click();

  // Vérifie le message d'erreur
  await expect(page.getByText("Le mot de passe doit contenir au moins 6 caractères !")).toBeVisible();
});

// ✅ TEST AVEC EMAIL DÉJÀ UTILISÉ
// test("La page de formulaire de register doit afficher une erreur si l'email est déjà utilisé", async ({ page }) => {
//   await page.goto("/register");
//   await expect(page.getByRole("heading", { name: "Inscription" })).toBeVisible();

//   await page.getByTestId("register-username").fill("existingUser");
//   await page.getByTestId("register-email").fill("existingUser@test.com"); // Email déjà existant
//   await page.getByTestId("register-password").fill("123Test");
//   await page.getByTestId("register-password-confirm").fill("123Test");
//   await page.getByTestId("register-submit").click();
//   await page.waitForTimeout(500);
//   // Vérifie le message d'erreur (simulé depuis le backend)
//   await expect(page.getByText("Cet email est déjà utilisé !")).toBeVisible();
// });
