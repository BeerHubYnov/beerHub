import { test, expect } from "@playwright/test";

// TEST AVEC GOOD USER
test("La page de formulaire de register doit se charger et vérifier le bon déroulement de la connexion", async ({
  page,
}) => {
  await page.goto("/register");
  const headTitle = page.getByRole("heading", { name: "Inscription" });
  await expect(headTitle).toBeVisible();
  await page.getByTestId("register-username").fill("testPlaywright767");
  await page.getByTestId("register-email").fill("testPlaywright767@test.com");
  await page.getByTestId("register-password").fill("123Test");
  await page.getByTestId("register-password-confirm").fill("123Test");
  await page.getByTestId("register-submit").click();
});

// TEST AVEC WRONG USER
test("La page de formulaire de register doit se charger et afficher un message d'erreur", async ({
  page,
}) => {
  await page.goto("/register");
  const headTitle = page.getByRole("heading", { name: "Inscription" });
  await expect(headTitle).toBeVisible();
  await page.getByTestId("register-username").fill("testPlaywright772");
  await page.getByTestId("register-email").fill("testPlaywright772@test.com");
  await page.getByTestId("register-password").fill("123Test");
  await page.getByTestId("register-password-confirm").fill("1234Test");
  await page.getByTestId("register-submit").click();

  // Vérifie si le message d'erreur est présent
  await expect(
    page.getByText("Les mots de passe ne correspondent pas !")
  ).toBeVisible();
});

// test("Ne doit pas autoriser l'inscription avec un email invalide", async ({
//   page,
// }) => {
//   await page.goto("/register");

//   await page.getByTestId("register-username").fill("InvalidEmailUser");
//   await page.getByTestId("register-email").fill("invalid-email"); // Mauvais format
//   await page.getByTestId("register-password").fill("123Test");
//   await page.getByTestId("register-password-confirm").fill("123Test");
//   await page.getByTestId("register-submit").click();

//   await expect(page.getByText("Email invalide")).toBeVisible(); // Assure-toi que ton backend renvoie cette erreur
// });
// test("Ne doit pas autoriser l'inscription avec un mot de passe trop court", async ({
//   page,
// }) => {
//   await page.goto("/register");

//   await page.getByTestId("register-username").fill("WeakPasswordUser");
//   await page.getByTestId("register-email").fill("testWeakPassword@test.com");
//   await page.getByTestId("register-password").fill("123"); // Trop court
//   await page.getByTestId("register-password-confirm").fill("123");
//   await page.getByTestId("register-submit").click();

//   await expect(
//     page.getByText("Le mot de passe doit contenir au moins 6 caractères")
//   ).toBeVisible();
// });
// test("Ne doit pas autoriser l'inscription avec un email déjà utilisé", async ({
//   page,
// }) => {
//   await page.goto("/register");

//   await page.getByTestId("register-username").fill("existingUser");
//   await page.getByTestId("register-email").fill("existingUser@test.com");
//   await page.getByTestId("register-password").fill("123Test");
//   await page.getByTestId("register-password-confirm").fill("123Test");
//   await page.getByTestId("register-submit").click();

//   await expect(page.getByText("Cet email est déjà utilisé")).toBeVisible();
// });
// test("Redirige vers la page de connexion après une inscription réussie", async ({
//   page,
// }) => {
//   await page.goto("/register");

//   await page.getByTestId("register-username").fill("newUser123");
//   await page.getByTestId("register-email").fill("newUser123@test.com");
//   await page.getByTestId("register-password").fill("123Test");
//   await page.getByTestId("register-password-confirm").fill("123Test");
//   await page.getByTestId("register-submit").click();

//   await page.waitForURL("/login"); // Vérifie la redirection vers /login
// });