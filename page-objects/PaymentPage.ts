import { expect, Locator, Page } from '@playwright/test'

export class PaymentPage {
  readonly page: Page //Page is type, readonly - value cannot be changed
  readonly payeeSelect: Locator
  readonly payeeDetailButton: Locator
  readonly payeeDetail: Locator
  readonly accountSelect: Locator
  readonly amount: Locator
  readonly date: Locator
  readonly description: Locator
  readonly submitPaymentButton: Locator
  readonly message: Locator

  constructor(page: Page) {
    this.page = page
    this.payeeSelect = page.locator('#sp_payee')
    this.payeeDetailButton = page.locator('#sp_get_payee_details')
    this.payeeDetail = page.locator('#sp_payee_details')
    this.accountSelect = page.locator('#sp_account')
    this.amount = page.locator('#sp_amount')
    this.date = page.locator('#sp_date')
    this.description = page.locator('#sp_description')
    this.submitPaymentButton = page.locator('#pay_saved_payees')
    this.message = page.locator('#alert_content > span')
  }

  async createPayment() {
    await this.payeeSelect.selectOption('apple')
    await this.payeeDetailButton.click()
    await expect(this.payeeDetail).toBeVisible()
    await this.accountSelect.selectOption('6')
    await this.amount.type('6000')
    await this.date.type('2023-08-09')
    await this.description.type('Test')
    await this.submitPaymentButton.click()
  }

  async assertSuccessMessage() {
    await expect(this.message).toBeVisible()
    await expect(this.message).toContainText(
      'The payment was successfully submitted.',
    )
  }
}
