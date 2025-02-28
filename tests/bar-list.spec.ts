import { test, expect } from "@playwright/test";

// TEST AVEC USER NON CONNECTE
test("La page de listing des bars doit se charger correctement", async ({
  page,
}) => {
  await page.goto("/bars"); // Accède à la page des bars

  const headTitle = page.getByRole("heading", { name: "Liste des bars" });
  await expect(headTitle).toBeVisible();

  // ✅ Récupère uniquement le premier élément avec `.first()`
  const firstBarCard = page.getByTestId("bar-card").first();
  // await expect(firstBarCard).toBeVisible();

  // ✅ Récupère et clique sur le bouton "Voir les détails" à l'intérieur du premier BarCard
  const detailsButton = firstBarCard.getByRole("link", {
    name: "Voir les détails",
  });
  // await expect(detailsButton).toBeVisible();
  await detailsButton.click();

  // ✅ Vérifie que la navigation s'est bien effectuée
  await expect(page).toHaveURL(/\/bar\/\d+/); // Vérifie que l'URL contient "/bar/{id}"

  
});
