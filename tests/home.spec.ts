import { test, expect } from '@playwright/test';

test('La page d\'accueil doit se charger et afficher les bons éléments', async ({ page }) => {
  await page.goto('/'); // Accède à la page d'accueil
//   await page.pause();

await page.waitForTimeout(15000);

  // Vérifie si l'élément HeadHomeContent est présent
  const headTitle = page.getByRole('heading', { name: 'BeerHub' });
  await expect(headTitle).toBeVisible();
  await page.pause();
  await expect(headTitle).toHaveText('BeerHub');

  // Vérifie si le sous-titre de HeadHomeContent est bien affiché
  const subTitle = page.getByText('La plateforme des évènements')
  await expect(subTitle).toBeVisible();


  // Vérifie la présence des liens vers la liste des bars et des événements
  const barsLink = page.getByRole('link', { name: 'Liste des bars' })
  await expect(barsLink).toBeVisible();

  const eventsLink = page.getByRole('link', { name: 'Liste des évents' })
  await expect(eventsLink).toBeVisible();

  // Vérifie que les liens mènent aux bonnes pages
  await barsLink.click();
  await expect(page).toHaveURL('/bars'); // Assurez-vous que l'URL est correcte

  await page.goBack(); // Retour à la page d'accueil
  await eventsLink.click();
  await expect(page).toHaveURL('/events'); // Vérifie la navigation vers events
});
