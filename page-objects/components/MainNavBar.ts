import { Locator, Page } from '@playwright/test'

export class MainNavBar {
  readonly page: Page
  readonly accountSummary: Locator
  readonly accountActivity: Locator
  readonly transferFunds: Locator
  readonly payBill: Locator
  readonly myMoneyApp: Locator
  readonly onlineStatement: Locator

  constructor(page: Page) {
    this.page = page
    this.accountSummary = page.locator('#account_summary_tab')
    this.accountActivity = page.locator('#account_activity_tab')
    this.transferFunds = page.locator('#transfer_funds_tab')
    this.payBill = page.locator('#pay_bills_tab')
    this.myMoneyApp = page.locator('#money_map_tab')
    this.onlineStatement = page.locator('#online_statements_tab')
  }

  async clickOnTab(tabName) {
    switch (tabName) {
      case 'Account Summary':
        await this.accountSummary.click()
        break
      case 'Account Activity':
        await this.accountActivity.click()
        break
      case 'Transfer Funds':
        await this.transferFunds.click()
        break
      case 'Pay Bills':
        await this.payBill.click()
        break
      case 'My Money App':
        await this.myMoneyApp.click()
        break
      case 'Online Statement':
        await this.onlineStatement.click()
        break
      default: //for case when pass value that not exist
        throw new Error('This tab does not exist')
    }
  }
}
