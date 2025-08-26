import { test, expect } from '@playwright/test';

test('Unauthorized Access', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.saucedemo.com/inventory.html');

    await expect(page).toHaveURL('https://www.saucedemo.com/');

    await expect(page.locator('[data-test="login-button"]')).toBeVisible();

    await context.close();
});