import { test, expect } from '@playwright/test'
import { loadHomePage, assertTitle } from '../helpers'

test.describe('first test suite', () => {
  test.beforeEach(async ({ page }) => {
    //hook for repetitive parts
    //call functions from helper
    await loadHomePage(page)
    //await assertTitle(page)
  })
  test('simple test', async ({ page }) => {
    await page.screenshot({ path: 'screenshot.png', fullPage: true }) //make screenshot of full page
    const pageTitle = await page.locator('h1')

    //make screenshot of separate element
    const element = await page.locator('h1')
    await element.screenshot({ path: 'h1_single_screenshot.png' })

    await expect(pageTitle).toContainText('Example Domain')
  })
})

test.describe('second test suite', () => {
  test('clicking', async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com')
    await page.click('#signin_button')
    await page.type('#user_login', 'username')
    await page.type('#user_password', 'userpass')
    await page.click('text=Sign in')
    const errorMessage = await page.locator('.alert-error')
    await expect(errorMessage).toContainText('Login and/or password are wrong.')
  })
})
