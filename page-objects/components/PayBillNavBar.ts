import { Locator, Page } from '@playwright/test'

export class PayBillNavBar {
  readonly page: Page
  readonly paySavedPayee: Locator
  readonly addNewPayee: Locator
  readonly purchaseForeignCurrency: Locator

  constructor(page: Page) {
    this.page = page
    this.paySavedPayee = page.locator('text=Pay Saved Payee')
    this.addNewPayee = page.locator('text=Add New Payee')
    this.purchaseForeignCurrency = page.locator(
      'text=Purchase Foreign Currency',
    )
  }

  async clickOnTab(tabName) {
    switch (tabName) {
      case 'Pay Saved Payee':
        await this.paySavedPayee.click()
        break
      case 'Add New Payee':
        await this.addNewPayee.click()
        break
      case 'Purchase Foreign Currency':
        await this.purchaseForeignCurrency.click()
        break
      default: //for case when pass value that not exist
        throw new Error('This tab does not exist')
    }
  }
}
