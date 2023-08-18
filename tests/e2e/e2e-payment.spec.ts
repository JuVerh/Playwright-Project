import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { HomePage } from '../../page-objects/HomePage'
import { TransferPage } from '../../page-objects/TransferFundsPage'
import { PaymentPage } from '../../page-objects/PaymentPage'
import { MainNavBar } from '../../page-objects/components/MainNavBar'

test.describe('New payment', () => {
  let loginPage: LoginPage
  let homePage: HomePage
  let transferPage: TransferPage
  let paymentPage: PaymentPage
  let mainNavBar: MainNavBar

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    loginPage = new LoginPage(page)
    transferPage = new TransferPage(page)
    paymentPage = new PaymentPage(page)
    mainNavBar = new MainNavBar(page)

    await homePage.visit()
    await homePage.signIn()
    await loginPage.login('username', 'password')
    await transferPage.visit()
  })
  test('Verify results of each account', async ({ page }) => {
    mainNavBar.clickOnTab('Pay Bills')
    await paymentPage.createPayment()
    await paymentPage.assertSuccessMessage()
  })
})
