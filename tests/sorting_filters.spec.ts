import { test, expect } from '@playwright/test';

test('Sorting Filters', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/inventory.html');

    const getName = async () => await page.locator('.inventory_item_name').allTextContents();
    const getPrices = async () => {
        const rawPrices = await page.locator('.inventory_item_price').allTextContents();
        return rawPrices.map(p => parseFloat(p.replace('$', '')));
    }

    const sortedNames = [...(await getName())].sort();
    const sortedDescNames = [...sortedNames].reverse();

    const sortedAsc = [...(await getPrices())].sort((a, b) => a - b);
    const sortedDesc = [...sortedAsc].reverse();
    
    const sortSelect  = await page.locator('.product_sort_container');
    const options = ['az', 'za', 'lohi', 'hilo'];

    for(const option of options){
        await sortSelect.selectOption(option);
        const selectedValue = await sortSelect.inputValue();

        if (selectedValue === 'az') {   
            expect(await getName()).toEqual(sortedNames);
        }
        if (selectedValue === 'za') {
            expect(await getName()).toEqual(sortedDescNames);
        }
        if (selectedValue === 'lohi') {
            expect(await getPrices()).toEqual(sortedAsc);
        } 
        if (selectedValue === 'hilo') {
            expect(await getPrices()).toEqual(sortedDesc);
        }
        console.log(`✅ Checked sorting option: ${selectedValue}`);
    }

});