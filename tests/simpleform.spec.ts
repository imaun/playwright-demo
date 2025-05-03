import { test, expect } from '@playwright/test';

test.describe('Simple Form', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://127.0.0.1:8080/simple-form.html');
    });

    test('selecting basic sets correct itemCode and adjustmentFactor', async ({ page }) => {
        await page.selectOption('#priceCategory', 'basic');
        await expect(page.locator('#itemCode')).toHaveValue('B100');
        await expect(page.locator('#adjustmentFactor')).toHaveValue('1');
    });

    test('selecting premium sets correct itemCode and adjustmentFactor', async ({ page }) => {
        await page.selectOption('#priceCategory', 'premium');
        await expect(page.locator('#itemCode')).toHaveValue('P200');
        await expect(page.locator('#adjustmentFactor')).toHaveValue('1.5');
    });

    test('adjustmentFactor over 2.0 updates itemCode to HIGH', async ({ page }) => {
        await page.fill('#adjustmentFactor', '2.5');
        await expect(page.locator('#itemCode')).toHaveValue('HIGH');
    });

    test('clearing priceCategory clears itemCode and adjustmentFactor', async ({ page }) => {
        await page.selectOption('#priceCategory', '');
        await expect(page.locator('#itemCode')).toHaveValue('');
        await expect(page.locator('#adjustmentFactor')).toHaveValue('');
    });

    test('shows error when submitting incomplete form', async ({ page }) => {
        await page.click('button[type=submit]');
        await expect(page.locator('#errorMessage')).toBeVisible();
        await expect(page.locator('#successMessage')).toBeHidden();
    });

    test('submits form successfully with valid data', async ({ page }) => {
        await page.selectOption('#priceCategory', 'basic');
        await page.fill('#itemCode', 'B100');
        await page.fill('#adjustmentFactor', '1.0');
        await page.click('button[type=submit]');
        await expect(page.locator('#errorMessage')).toBeHidden();
        await expect(page.locator('#successMessage')).toBeVisible();
    });

    test('takes screenshot after successful submission', async ({ page }) => {
        await page.selectOption('#priceCategory', 'premium');
        await page.fill('#itemCode', 'P200');
        await page.fill('#adjustmentFactor', '1.5');
        await page.click('button[type=submit]');
        await page.screenshot({ path: 'test-results/success-screenshot.png' });
    });
});