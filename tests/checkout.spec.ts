import { test, expect } from '@playwright/test';

test('checkout process', async ({ page }) => {
    
    const fillCheckoutForm = async (first, last, postal) => {
        await page.locator('[data-test="firstName"]').fill(first);
        await page.locator('[data-test="lastName"]').fill(last);
        await page.locator('[data-test="postalCode"]').fill(postal);
        await page.locator('#continue').click();
    };

    const addProduct = async (name: string) => {
        await page.locator('.inventory_item').filter({ hasText: name }).locator('.btn_inventory').click();
    };

    await page.goto('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();

    const P_name1 = await page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Fleece Jacket' }).locator('.inventory_item_name').textContent() ?? '';
    const P_price1 = await page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Fleece Jacket' }).locator('.inventory_item_price').textContent() ?? '';
    const P_name2 = await page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Bolt T-Shirt' }).locator('.inventory_item_name').textContent() ?? '';
    const P_price2 = await page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Bolt T-Shirt' }).locator('.inventory_item_price').textContent() ?? '';

    await addProduct('Sauce Labs Fleece Jacket');
    await addProduct('Sauce Labs Bolt T-Shirt');
    await expect(page.locator('.shopping_cart_badge')).toBeVisible();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');

    await page.locator('.shopping_cart_link').click();
    await expect(page.url()).toBe('https://www.saucedemo.com/cart.html');
    await expect(page.locator('.inventory_item_name').nth(0)).toHaveText(P_name1);
    await expect(page.locator('.inventory_item_price').nth(0)).toHaveText(P_price1);

    await expect(page.locator('.inventory_item_name').nth(1)).toHaveText(P_name2);
    await expect(page.locator('.inventory_item_price').nth(1)).toHaveText(P_price2);

    await page.locator('#checkout').click();
    await expect(page.url()).toBe('https://www.saucedemo.com/checkout-step-one.html');
    await expect(page.locator('.title')).toHaveText('Checkout: Your Information');

    await fillCheckoutForm('Lucas', 'Scognamiglio', '15000');

    await expect(page.url()).toBe('https://www.saucedemo.com/checkout-step-two.html');
    await expect(page.locator('.title')).toHaveText('Checkout: Overview');

    const subtotal = (parseFloat(P_price1.replace('$', '')) + parseFloat(P_price2.replace('$', ''))).toFixed(2);
    await expect(page.locator('.summary_subtotal_label')).toHaveText('Item total: $' + subtotal);

    const tax = (await page.locator('.summary_tax_label').textContent() ?? '').replace('Tax: $', '');
    await expect(page.locator('.summary_total_label')).toHaveText('Total: $' + (parseFloat(subtotal) + parseFloat(tax)).toFixed(2));

    await page.locator('#finish').click();
    await expect(page.url()).toBe('https://www.saucedemo.com/checkout-complete.html');
    await expect(page.locator('.title')).toHaveText('Checkout: Complete!');
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');

    await page.locator('#back-to-products').click();
    await expect(page.url()).toBe('https://www.saucedemo.com/inventory.html');
});