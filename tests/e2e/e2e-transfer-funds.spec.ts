import { test } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { HomePage } from '../../page-objects/HomePage'
import { TransferPage } from '../../page-objects/TransferFundsPage'

test.describe('Transfer funds and Make payments', () => {
  let loginPage: LoginPage
  let homePage: HomePage
  let transferPage: TransferPage

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    loginPage = new LoginPage(page)
    transferPage = new TransferPage(page)
    await homePage.visit()
    await homePage.signIn()
    await loginPage.login('username', 'password')
    await transferPage.visit()
  })

  test('Transfer funds', async ({ page }) => {
    await transferPage.transferFunds()
    await transferPage.assertSuccessMessage()
  })
})
