import { test, expect } from '@playwright/test'
 
test('should navigate to the / page', async ({ page }) => {
  await page.goto('./login')
  await page.getByRole('button').getByText('Log in').click();
  await page.getByPlaceholder("johndoe@gmail.com").fill('maxnoelsens@gmail.com');
  await page.getByPlaceholder("******").fill('azerty');
  await page.getByRole('button').getByText('Log in').click();
  await expect(page).toHaveURL('./')
})