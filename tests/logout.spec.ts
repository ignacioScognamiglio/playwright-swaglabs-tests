import {test, expect} from '@playwright/test';

test('Logout', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
    await page.locator('#react-burger-menu-btn').click();
    await expect(page.locator('.bm-menu-wrap')).toBeVisible();
    await page.locator('#logout_sidebar_link').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
});