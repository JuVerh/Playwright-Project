import { test } from '@playwright/test'

import { LoginPage } from '../../page-objects/LoginPage'
import { HomePage } from '../../page-objects/HomePage'

test.describe('Login page visual test', () => {
  let loginPage: LoginPage
  let homePage: HomePage

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    homePage = new HomePage(page)
    await homePage.visit()
    await homePage.signIn()
  })

  test('Login form snapshot', async ({ page }) => {
    await loginPage.loginFormSnapshot()
  })

  test('Login form error snapshot', async ({ page }) => {
    await loginPage.login('invalid_login', 'invalid_password')
    await loginPage.loginFormErrorSnapshot()
  })
})
