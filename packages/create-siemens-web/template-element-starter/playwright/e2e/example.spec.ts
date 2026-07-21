import { expect, test } from '@playwright/test';

import { ExamplePage } from '../support/example';

test.describe('Example', () => {
  test('should load example', async ({ page }) => {
    await page.goto(''); // Per default waits for `load` event

    const examplePage = new ExamplePage(page);

    const example = examplePage.exampleText().first(); // No await, so no waiting here. It is evaluated on every use. Per default only only one match is allowed.

    await expect(example).toBeVisible(); // Waits for it to be visible.
  });
});
