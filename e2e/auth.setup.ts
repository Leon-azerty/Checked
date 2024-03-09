import { test as setup, expect } from '@playwright/test'

const authFile = 'playwright/.auth/user.json'

setup('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto('./login')
  await page.getByPlaceholder('johndoe@gmail.com').fill('maxnoelsens@gmail.com')
  await page.getByPlaceholder('******').fill('azerty')

  await page.getByRole('button', { name: 'Log in' }).click()
  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL('./')
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  // await expect(page.getByRole('button', { name: 'View profile and more' })).toBeVisible();

  // End of authentication steps.

  await page.context().storageState({ path: authFile })
})
