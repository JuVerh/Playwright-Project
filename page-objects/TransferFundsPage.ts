import { expect, Locator, Page } from '@playwright/test'

export class TransferPage {
  readonly page: Page
  readonly transferTab: Locator
  readonly fromAccount: Locator
  readonly toAccount: Locator
  readonly amount: Locator
  readonly description: Locator
  readonly continue: Locator
  readonly boardHeader: Locator
  readonly successMessage: Locator
  readonly submit: Locator

  constructor(page: Page) {
    this.page = page
    this.transferTab = page.locator('#transfer_funds_tab')
    this.fromAccount = page.locator('#tf_fromAccountId')
    this.toAccount = page.locator('#tf_toAccountId')
    this.amount = page.locator('#tf_amount')
    this.description = page.locator('#tf_description')
    this.continue = page.locator('#btn_submit')
    this.boardHeader = page.locator('h2.board-header')
    this.successMessage = page.locator('.alert-success')
    this.submit = page.locator('#btn_submit')
  }

  async visit() {
    await this.page.goto(
      'http://zero.webappsecurity.com/bank/transfer-funds.html',
    )
    await expect(this.transferTab).toBeVisible()
  }

  async transferFunds() {
    await this.fromAccount.selectOption('2')
    await this.toAccount.selectOption('3')
    await this.amount.type('500')
    await this.description.type('Test message')
    await this.continue.click()
    await expect(this.boardHeader).toContainText('Verify')
    await this.submit.click()
  }

  async assertSuccessMessage() {
    await expect(this.successMessage).toContainText(
      'You successfully submitted your transaction.',
    )
  }
}
