import { test, expect } from '@playwright/test';

test('Checkout Empty Cart', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/cart.html');
    await expect(page.locator('.cart_item')).toHaveCount(0);
    await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();

    await page.locator('#checkout').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
});