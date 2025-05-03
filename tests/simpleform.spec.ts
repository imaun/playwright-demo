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
});