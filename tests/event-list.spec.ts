import { test, expect } from "@playwright/test";

// TEST AVEC USER NON CONNECTE
test("La page de listing des events doit se charger correctement", async ({
  page,
}) => {
  await page.goto("/events"); // Accède à la page d'assccueil
 
  const headTitle = page.getByRole("heading", { name: "Liste des Events" });
  await expect(headTitle).toBeVisible();

  // ✅ Récupère uniquement le premier élément avec `.first()`
  const firstEventCard = page.getByTestId("event-card").first();
  await expect(firstEventCard).toBeVisible();

  // ✅ Récupère et clique sur le bouton "Voir les détails" à l'intérieur du premier BarCard
  const detailsButton = firstEventCard.getByRole("link", {
    name: "Voir les détails",
  });
  await expect(detailsButton).toBeVisible();
  await detailsButton.click();
  // await page.pause();

  // ✅ Vérifie que la navigation s'est bien effectuée
  await expect(page).toHaveURL(/\/event\/\d+/); // Vérifie que l'URL contient "/bar/{id}"

  
});



