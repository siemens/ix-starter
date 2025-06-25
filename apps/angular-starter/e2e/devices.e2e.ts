import { test, expect, Page } from "@playwright/test";

async function filterDevicePageByDeviceName(page: Page, filterBy: string, filterString: string) {
    const categoryFilter = page.locator("ix-category-filter");
    const filterInput = categoryFilter.locator("input");

    await filterInput.fill(filterBy);

    const dropdown = categoryFilter.locator("ix-dropdown");
    await expect(dropdown.getByText("Categories")).toBeVisible();

    await page.keyboard.press("Tab");
    await page.keyboard.press("Enter");

    await expect(categoryFilter.locator("ix-dropdown").getByText("Categories")).not.toBeVisible();
    await expect(categoryFilter.locator("ix-dropdown").getByText(filterBy)).toBeVisible();

    await filterInput.fill(filterString);
    await page.keyboard.press("Enter");
    await page.mouse.click(0, 0);

    await expect(categoryFilter.locator("ix-dropdown")).not.toBeVisible();
}

test('should display the devices table', async ({ page }) => {
    await page.goto("http://localhost:4200/devices");
    await expect(page.locator('ag-grid-angular')).toBeVisible();
});


test('should expand a device row on click', async ({ page }) => {
    await page.goto("http://localhost:4200/devices");
    const firstRow = page.locator('.ag-center-cols-container .ag-row').first();
    await firstRow.click();
    // Check for expanded details (adjust selector as needed)
    await expect(page.locator('ix-pane')).toBeVisible();
});


test("should filter devices by deviceName", async ({ page }) => {
    await page.goto("http://localhost:4200/devices");

    const aggrid = page.locator(".ag-root-wrapper");
    const rows = aggrid.locator(".ag-center-cols-container .ag-row");

    await expect(rows).toHaveCount(21, {
        // AG-Grid takes some time to filter the rows
        timeout: 500,
    });

    await filterDevicePageByDeviceName(page, "Device name", "s71200");

    await expect(rows).toHaveCount(1, {
        // AG-Grid takes some time to filter the rows
        timeout: 500,
    });
});

test('should filter devices by status', async ({ page }) => {
    await page.goto("http://localhost:4200/devices");

    const aggrid = page.locator(".ag-root-wrapper");
    const rows = aggrid.locator(".ag-center-cols-container .ag-row");

    await expect(rows).toHaveCount(21, {
        // AG-Grid takes some time to filter the rows
        timeout: 500,
    });

    await filterDevicePageByDeviceName(page, "Status", "Offline");

    await expect(rows).toHaveCount(1, {
        // AG-Grid takes some time to filter the rows
        timeout: 500,
    });
});


