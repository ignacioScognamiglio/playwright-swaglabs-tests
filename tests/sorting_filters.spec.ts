import { test, expect } from '@playwright/test';
import { InventoryPage } from '../POM/InventoryPage';

test('Sorting Filters', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();

    // Get initial lists
    const names = await inventoryPage.getAllProductNames();
    const prices = await inventoryPage.getAllProductPrices();

    // Create sorted versions for comparison
    const sortedNames = [...names].sort();
    const sortedDescNames = [...sortedNames].reverse();
    const sortedAsc = [...prices].sort((a, b) => a - b);
    const sortedDesc = [...sortedAsc].reverse();
    
    const options = ['az', 'za', 'lohi', 'hilo'] as const;

    for (const option of options) {
        await inventoryPage.selectSortOption(option);
        
        if (option === 'az') {   
            expect(await inventoryPage.getAllProductNames()).toEqual(sortedNames);
        }
        if (option === 'za') {
            expect(await inventoryPage.getAllProductNames()).toEqual(sortedDescNames);
        }
        if (option === 'lohi') {
            expect(await inventoryPage.getAllProductPrices()).toEqual(sortedAsc);
        } 
        if (option === 'hilo') {
            expect(await inventoryPage.getAllProductPrices()).toEqual(sortedDesc);
        }
        console.log(`✅ Checked sorting option: ${option}`);
    }

});