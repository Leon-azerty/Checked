import { test, expect } from '@playwright/test'

test('should show the Create a todo form', async ({ page }) => {
  await page.goto('./')
  await page.getByRole('button').getByText('Create todo').click();
  await expect(page.getByRole("button").getByText('Validate')).toBeVisible();
})

test('should hide the Create a todo form', async ({ page }) => {
  await page.goto('./')
  await page.getByRole('button').getByText('Create todo').click();
  await page.getByTestId('close').click();
  await expect(page.getByRole("button").getByText('Validate')).not.toBeVisible();
})

test('create a todo without Deadline and whitout tags and verify it', async ({ page }) => {
  await page.goto('./')
  await page.getByRole('button').getByText('Create todo').click();
  await page.getByPlaceholder("Title").fill('title_test');
  await page.getByPlaceholder("Description").fill('desc_test');
  await page.getByRole("button").getByText('Validate').click();
  await expect(page.locator('text=title_test')).toBeVisible();
  await expect(page.locator('text=desc_test')).toBeVisible();
})

test('delete a todo verify it', async ({ page }) => {
  await page.goto('./')
  await page.getByRole("link") .click();
  // await expect(page.locator('text=title_test')).toBeVisible();
  // await expect(page.locator('text=desc_test')).toBeVisible();
})