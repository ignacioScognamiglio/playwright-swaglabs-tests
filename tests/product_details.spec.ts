import { test, expect } from '@playwright/test';

test('product details', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');

    const name = await page.locator('.inventory_item_name').nth(3).textContent() ?? '';
    const desc = await page.locator('.inventory_item_desc').nth(3).textContent() ?? '';
    const price = await page.locator('.inventory_item_price').nth(3).textContent() ?? '';

    await page.click('#item_5_img_link');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=5');

    await expect(page.locator('.inventory_details_name')).toHaveText(name);
    await expect(page.locator('.inventory_details_desc')).toHaveText(desc);
    await expect(page.locator('.inventory_details_price')).toHaveText(price);

    await page.locator("#back-to-products").click();
    await page.goto('https://www.saucedemo.com/inventory.html');

});