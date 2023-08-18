import { test } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { HomePage } from '../../page-objects/HomePage'
import { TransferPage } from '../../page-objects/TransferFundsPage'

test.describe.parallel('Login / Logout flow', () => {
  let loginPage: LoginPage
  let homePage: HomePage
  let transferPage: TransferPage

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    homePage = new HomePage(page)
    transferPage = new TransferPage(page)
    await homePage.visit()
  })

  test('Negative scenario with login', async ({ page }) => {
    await homePage.signIn()
    await loginPage.login('invalid username', 'invalid password')
    await loginPage.wait(3000)
    await loginPage.assertError()
  })

  test('Positive scenario with login + logout', async ({ page }) => {
    await homePage.signIn()
    await loginPage.login('username', 'password')

    //workaround for ssl issue
    await transferPage.visit()
    await loginPage.logout()
  })
})
