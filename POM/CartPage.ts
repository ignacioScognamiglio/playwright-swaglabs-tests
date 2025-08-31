import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly cartList: Locator;
    readonly cartItems: Locator;
    readonly removeButtons: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartList = page.locator('.cart_list');
        this.cartItems = page.locator('.cart_item');
        this.removeButtons = page.locator('.cart_button');
    }

    async goto() {
        await this.page.goto('https://www.saucedemo.com/cart.html');
    }

    async getCartItemsCount(): Promise<number> {
        return await this.cartItems.count();
    }

    async removeItem(index: number) {
        await this.removeButtons.nth(index).click();
        await this.page.waitForSelector('.removed_cart_item', { state: 'visible' });
    }
}
