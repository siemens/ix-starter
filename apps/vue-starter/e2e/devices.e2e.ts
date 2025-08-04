import { test, expect, Page } from "@playwright/test";

async function filterDevicePageByDeviceName(page: Page, deviceName: string) {
  const categoryFilter = page.locator("ix-category-filter");
  const filterInput = categoryFilter.locator("input");

  await filterInput.fill("Device name");

  const dropdown = categoryFilter.locator("ix-dropdown");
  await expect(dropdown.getByText("Categories")).toBeVisible();

  await page.keyboard.press("Tab");
  await page.keyboard.press("Enter");

  await expect(categoryFilter.locator("ix-dropdown").getByText("Categories")).not.toBeVisible();
  await expect(categoryFilter.locator("ix-dropdown").getByText("Device name")).toBeVisible();

  await filterInput.fill(deviceName);
  await page.keyboard.press("Enter");
  await page.mouse.click(0, 0);

  await expect(categoryFilter.locator("ix-dropdown")).not.toBeVisible();
}

test("filter for a deviceName", async ({ page }) => {
  await page.goto("/#/devices");

  const aggrid = page.locator(".ag-root-wrapper");
  const rows = aggrid.locator(".ag-center-cols-container .ag-row");

  await expect(aggrid).toBeVisible();

  await expect(rows).toHaveCount(22);

  await filterDevicePageByDeviceName(page, "s71200");

  await expect(rows).toHaveCount(1, {
    timeout: 500,
  });
});

test("add a new device", async ({ page }) => {
  await page.goto("/#/devices");

  const newDeviceName = "My new device";

  const addDeviceButton = page.getByLabel("add device");
  await addDeviceButton.click();

  const modal = page.locator("ix-modal");

  const device = modal.getByLabel("Device Name");
  await device.locator("input").fill(newDeviceName);

  const okayButton = modal.getByLabel("add device");
  await okayButton.click();

  await expect(modal).not.toBeVisible();
  await expect(modal).not.toBeInViewport();

  await filterDevicePageByDeviceName(page, newDeviceName);

  const aggrid = page.locator(".ag-root-wrapper");
  const myNewRow = aggrid.getByRole("gridcell", { name: newDeviceName });

  await expect(myNewRow).toBeVisible();
});
