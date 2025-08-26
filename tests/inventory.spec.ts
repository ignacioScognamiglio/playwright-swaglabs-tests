import { test, expect } from '@playwright/test';

test('Inventory', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');

    const products = await page.locator('.inventory_list');
    const count = await products.count();

    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
        const product = await products.nth(i);

        const name = product.locator('.inventory_item_name').nth(0);
        console.log(name);
        expect(name).toBeVisible;

        const price = product.locator('.inventory_item_price').nth(0);
        await expect(price).toBeVisible();

        const img = product.locator('img.inventory_item_img').nth(0);
        await expect(img).toBeVisible();
        await expect(img).toHaveAttribute('src', /.+\.jpg$/);
    }
});