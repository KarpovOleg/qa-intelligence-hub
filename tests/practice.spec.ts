import { test, expect } from '@playwright/test';

test.describe('Example.com smoke checks', () => {

  test('Example Domain loads expected content', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle('Example Domain');
    await expect(page.getByRole('heading', { name: 'Example Domain' })).toBeVisible();
    await expect(page.getByText('This domain is for use in documentation examples')).toBeVisible();
  });

  test('Intentional Failure for AI Analysis', async ({ page }) => {
    await page.goto('/');
    // We intentionally look for a non-existent element to trigger a Timeout
    await page.locator('#non-existent-id').click({ timeout: 5000 });
  });
});
