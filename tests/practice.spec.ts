import { test, expect } from '@playwright/test';

test.describe('E-Commerce Portfolio Demo', () => {

  test('Successful Login Flow', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');
    await page.getByLabel('Username').fill('practice');
    await page.getByLabel('Password').fill('SuperSecretPassword!');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('#flash')).toContainText('You logged into a secure area!');
  });

  test('Intentional Failure for AI Analysis', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');
    // We intentionally look for a non-existent element to trigger a Timeout
    await page.locator('#non-existent-id').click({ timeout: 5000 });
  });
});
