import { test, expect } from "@playwright/test";

// TEST AVEC USER NON CONNECTE
test("La page de listing des events doit se charger correctement", async ({
  page,
}) => {
  await page.goto("/events"); // Accède à la page d'assccueil
 
  const headTitle = page.getByRole("heading", { name: "Liste des Events" });
  await expect(headTitle).toBeVisible();

});



