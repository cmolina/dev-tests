import { expect, test as it, type Page } from '@playwright/test';

it('should list commodities', async ({ page }) => {
 await page.goto('/');

 await page.getByRole('link', { name: 'Commodities' }).click()

	await assertTableIsCorrect(page, 'Commodities', ['id dolor fugiat ex', 'et ad est, in non cillum']);
});


it('should list harvests', async ({ page }) => {
	await page.goto('/');

	await page.getByRole('link', { name: 'Harvests' }).click()

	await assertTableIsCorrect(page, 'Harvests', ['Roberto', 'LaMagicFarm', 'Javier', 'Lemon', 'Eureka']);
});

it('should list growers', async ({ page }) => {
	await page.goto('/');

	await page.getByRole('link', { name: 'Growers' }).click()

	await assertTableIsCorrect(page, 'Growers', ['voluptate tempor dolore exercitation	s', 'Uahr0tc@FOcujErXbq.huy', 'anim, enim dolore dolore exercitation']);
});

async function assertTableIsCorrect(page: Page, tableName: string, cells: string[]) {
	await expect(page.getByRole('heading', { name: tableName, level: 1 })).toBeVisible();
	await expect(page.getByRole('table', { name: `List of ${tableName}` })).toBeVisible();
	await expect(page.getByRole('row', { name: cells.join(' ') })).toBeVisible();
}

