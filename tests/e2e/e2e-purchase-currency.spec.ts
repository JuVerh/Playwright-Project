import { test } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { TransferPage } from '../../page-objects/TransferFundsPage'
import { LoginPage } from '../../page-objects/LoginPage'
import { MainNavBar } from '../../page-objects/components/MainNavBar'
import { PayBillNavBar } from '../../page-objects/components/PayBillNavBar'
import { PurchaseCurrencyPage } from '../../page-objects/PurchaseCurrencyPage'

test.describe('Purchase currency', () => {
  let homePage: HomePage
  let loginPage: LoginPage
  let transferPage: TransferPage
  let mainNavBar: MainNavBar
  let payBillNavBar: PayBillNavBar
  let buyCurrency: PurchaseCurrencyPage

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    loginPage = new LoginPage(page)
    transferPage = new TransferPage(page)
    mainNavBar = new MainNavBar(page)
    payBillNavBar = new PayBillNavBar(page)
    buyCurrency = new PurchaseCurrencyPage(page)

    await homePage.visit()
    await homePage.signIn()
    await loginPage.login('username', 'password')
    await transferPage.visit()
    await mainNavBar.clickOnTab('Pay Bills')
    await payBillNavBar.clickOnTab('Purchase Foreign Currency')
  })
  test('Verify purchasing foreign currency', async ({ page }) => {
    await buyCurrency.buy()
  })
})
