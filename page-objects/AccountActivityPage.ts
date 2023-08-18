import { expect, Locator, Page } from '@playwright/test'

export class AccountActivityPage {
  readonly page: Page
  readonly account: Locator
  readonly countOfRows: Locator
  readonly emptyResult: Locator

  constructor(page: Page) {
    this.page = page
    this.account = page.locator('#aa_accountId')
    this.countOfRows = page.locator('#all_transactions_for_account tbody tr')
    this.emptyResult = page.locator('.well')
  }

  async filterAccount() {
    await this.account.selectOption('2')
    await expect(this.countOfRows).toHaveCount(3)
    await this.account.selectOption('4')
    await expect(this.countOfRows).toHaveCount(2)
    await this.account.selectOption('6')
    await expect(this.emptyResult).toBeVisible()
  }
}
