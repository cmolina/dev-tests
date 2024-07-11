import { expect, test as it } from '@playwright/test';

it('should list commodities', async ({ page }) => {
	await page.goto('/');

	await page.getByRole('link', { name: 'Commodities' }).click()

	await expect(page.getByRole('heading', { name: 'Commodities', level: 1 })).toBeVisible();
	await expect(page.getByRole('table', { name: 'List of commodities' })).toBeVisible();
	await expect(page.getByRole('row', { name: 'id dolor fugiat ex et ad est, in non cillum' })).toBeVisible();
});


it('should list harvests', async ({ page }) => {
	await page.goto('/');

	await page.getByRole('link', { name: 'Harvests' }).click()

	await expect(page.getByRole('heading', { name: 'Harvests', level: 1 })).toBeVisible();
	await expect(page.getByRole('table', { name: 'List of harvests' })).toBeVisible();
	await expect(page.getByRole('row', { name: 'Roberto LaMagicFarm Javier Lemon Eureka' })).toBeVisible();
});
