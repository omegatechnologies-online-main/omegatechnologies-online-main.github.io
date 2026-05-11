import { test, expect } from '@playwright/test';

test.describe('Omega Technologies Landing Navigation', () => {
  test('should navigate to contact page when Apply Now is clicked', async ({ page }) => {
    await page.goto('/');

    // Wait for preloader to vanish
    await page.waitForTimeout(3500);

    // Click Apply Now in the Hero section
    await page.locator("text=Apply Now").first().click();

    // Check URL
    await expect(page).toHaveURL(/.*contact/);

    // Check Contact Page Header
    await expect(page.locator('h1')).toContainText("Let's talk growth.");
  });

  test('should have working services cards', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(3500);

    const serviceCards = page.locator('#services .grid > div');
    await expect(serviceCards).toHaveCount(6);
  });
});
