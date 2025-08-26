import { test, expect } from '@playwright/test';
import { get } from 'http';

test('Shopping Cart', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');

    const getCart = async () => {
        return await page.locator('.cart_list .cart_item').allTextContents();
    };
    const addItem = async (itemIndex: number) => {
        await page.locator('.inventory_item').nth(itemIndex).locator('.btn_inventory').click();
    }
    const removeItem = async (itemIndex: number) => {
        await page.locator('.inventory_item').nth(itemIndex).locator('.btn_inventory').click();
    }

    const badge = page.locator('.shopping_cart_badge');
    await expect(badge).not.toBeVisible();

    await addItem(0);
    await expect(badge).toHaveText('1');

    await addItem(1);
    await expect(badge).toHaveText('2');

    await removeItem(0);
    await expect(badge).toHaveText('1');

    await removeItem(1);
    await expect(badge).not.toBeVisible();

    //------------

    await expect(badge).not.toBeVisible();
    await addItem(-1);
    await expect(badge).toHaveText('1');

    await page.locator('.shopping_cart_link').click();
    await expect(page.url()).toBe('https://www.saucedemo.com/cart.html');
    await expect(await getCart()).toHaveLength(1);
    await expect(badge).toHaveText('1');


    await page.locator('.cart_item_label button').click();
    await expect(page.locator('.cart_item')).toHaveCount(0);
    await expect(badge).not.toBeVisible();


}); 