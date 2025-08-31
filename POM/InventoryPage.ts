import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly productList: Locator;
    readonly sortSelect: Locator;
    readonly productNames: Locator;
    readonly productPrices: Locator;
    readonly addToCartButtons: Locator;
    readonly shoppingCartBadge: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productList = page.locator('.inventory_list');
        this.sortSelect = page.locator('.product_sort_container');
        this.productNames = page.locator('.inventory_item_name');
        this.productPrices = page.locator('.inventory_item_price');
        this.addToCartButtons = page.locator('.btn_inventory');
        this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    }

    async goto() {
        await this.page.goto('https://www.saucedemo.com/inventory.html');
    }

    async getAllProductNames(): Promise<string[]> {
        return await this.productNames.allTextContents();
    }

    async getAllProductPrices(): Promise<number[]> {
        const rawPrices = await this.productPrices.allTextContents();
        return rawPrices.map(p => parseFloat(p.replace('$', '')));
    }

    async selectSortOption(option: 'az' | 'za' | 'lohi' | 'hilo') {
        await this.sortSelect.selectOption(option);
    }

    async addProductToCart(index: number) {
        await this.addToCartButtons.nth(index).click();
    }

    async getCartCount(): Promise<number> {
        try {
            const text = await this.shoppingCartBadge.textContent();
            return text ? parseInt(text) : 0;
        } catch {
            return 0;
        }
    }
}
