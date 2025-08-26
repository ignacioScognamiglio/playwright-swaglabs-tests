import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('https://www.saucedemo.com/');
  await page.fill('input[name="user-name"]', 'standard_user');
  await page.fill('input[name="password"]', 'secret_sauce');
  await page.click('input[type="submit"]');

  // Guardar la sesión
  await page.context().storageState({ path: 'storageState.json' });

  await browser.close();
}

export default globalSetup;
