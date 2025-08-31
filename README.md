## Automated Test Cases (Playwright + TypeScript)

This project contains a set of automated test cases. The tests are written using the Playwright framework and TypeScript, and are designed to be run on Sauce Labs. The goal is to validate core functionalities of an e-commerce site, including login, product navigation, and cart checkout. Tests are organized following POM (Page Object Model) for scalability.

## Pre-Setup: Automatic Login with `global-setup.ts`

To avoid logging in manually before every test, this project uses a global setup script called `global-setup.ts`.

This script:  
- Launches a Chromium browser.  
- Performs login on the website with valid credentials (`standard_user` / `secret_sauce`).  
- Saves the session state to a file named `storageState.json`.

Playwright uses this file to load the saved session automatically before running any test, allowing tests to start already authenticated without repeating the login process.

**Important:**  
- The `global-setup.ts` script runs automatically before the tests execute.  
- If credentials or login procedures change, update this script and regenerate the `storageState.json` file.


## How to run the tests

    1. Install the dependencies:
    attempt
    npm install

    2. Install the Playwright browsers:
    attempt
    npx playwright install

    3. Run the tests:
    attempt
    npx playwright test


### 1. Product Inventory
- **Objective:** Validate that a valid user can view the product list.  
- **Coverage:** At least one product is displayed, and each product has a name, price, and image.

### 2. Sorting Filters
- **Objective:** Validate the sorting dropdown functionality.  
- **Coverage:** Alphabetical order (A–Z) and price (low to high).

### 3. Shopping Cart
- **Objective:** Validate adding and removing products from the cart.  
- **Coverage:** Cart counter increases/decreases accordingly.

### 4. Product Details
- **Objective:** Validate access to the product detail page.  
- **Coverage:** Name, description, and price match the inventory view; “Back to products” button works.

### 5. Checkout (Full Purchase)
- **Objective:** Validate completing a purchase.  
- **Coverage:** Fill out form (first name, last name, postal code), review summary, and confirm order message.

### 6. Logout
- **Objective:** Validate user logout and redirection to the login screen.


### 7. Negative Cases  
These tests validate that the application correctly handles invalid or unauthorized scenarios.  

### Test 7.1 – Checkout with Empty Cart  
- **Purpose:** Ensure that the checkout process cannot be started when the shopping cart is empty.  
- **Expected Result:** The user should not be able to proceed to checkout without any products in the cart.  

### Test 7.2 – Unauthorized Access to `/inventory.html`  
- **Purpose:** Verify that the inventory page is protected and cannot be accessed without logging in.  
- **Expected Result:** The user should be automatically redirected to the login page when attempting direct access.  




