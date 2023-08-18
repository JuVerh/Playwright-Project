import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { HomePage } from '../../page-objects/HomePage'
import { TransferPage } from '../../page-objects/TransferFundsPage'
import { MainNavBar } from '../../page-objects/components/MainNavBar'
import { AccountActivityPage } from '../../page-objects/AccountActivityPage'

test.describe('Filter transaction', () => {
  let loginPage: LoginPage
  let homePage: HomePage
  let transferPage: TransferPage
  let accountActivityPage: AccountActivityPage
  let navBar: MainNavBar

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    loginPage = new LoginPage(page)
    transferPage = new TransferPage(page)
    accountActivityPage = new AccountActivityPage(page)
    navBar = new MainNavBar(page)

    await homePage.visit()
    await homePage.signIn()
    await loginPage.login('username', 'password')
    await transferPage.visit()
  })
  test('Verify results of each account', async ({ page }) => {
    navBar.clickOnTab('Account Activity')
    await accountActivityPage.filterAccount()
  })
})
