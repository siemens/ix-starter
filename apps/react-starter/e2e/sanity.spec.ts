import { test, expect } from '@playwright/test';

test.describe('React Starter – sanity checks', () => {
  test('app shell loads with header and menu', async ({ page }) => {
    await page.goto('/#/');
    await expect(page.locator('ix-application')).toBeVisible();
    await expect(page.locator('ix-application-header')).toBeVisible();
    await expect(page.locator('ix-menu')).toBeVisible();
  });

  test('Get Started page renders', async ({ page }) => {
    await page.goto('/#/');
    await expect(page.locator('ix-content-header')).toBeVisible();
    await expect(page.locator('text=Get started with Siemens Industrial Experience')).toBeVisible();
  });

  test('Forms page loads', async ({ page }) => {
    await page.goto('/#/forms');
    await expect(page.locator('ix-content-header')).toBeVisible();
  });

  test('Charts page loads with chart container', async ({ page }) => {
    await page.goto('/#/charts');
    await expect(page.locator('ix-content-header')).toBeVisible();
    await expect(page.locator('figure[aria-labelledby]')).toBeAttached();
  });

  test('Grids page loads', async ({ page }) => {
    await page.goto('/#/grids');
    await expect(page.locator('ix-content-header')).toBeVisible();
  });

  test('menu items are present for all pages', async ({ page }) => {
    await page.goto('/');
    const menuItems = page.locator('ix-menu-item');
    await expect(menuItems).toHaveCount(5);
  });

  test('navigation between pages works', async ({ page }) => {
    await page.goto('/');
    await page.locator('ix-menu-item', { hasText: 'Forms' }).click();
    await expect(page).toHaveURL(/\/forms/);
    await page.locator('ix-menu-item', { hasText: 'Charts' }).click();
    await expect(page).toHaveURL(/\/charts/);
    await page.locator('ix-menu-item', { hasText: 'Grids' }).click();
    await expect(page).toHaveURL(/\/grids/);
  });
});
