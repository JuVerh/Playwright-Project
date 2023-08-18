import { expect, Locator, Page } from '@playwright/test'

export class PurchaseCurrencyPage {
  readonly page: Page
  readonly currency: Locator
  readonly todayRate: Locator
  readonly amount: Locator
  readonly inDollars: Locator
  readonly calculateCosts: Locator
  readonly conversation: Locator
  readonly clickBuy: Locator
  readonly successMessage: Locator

  constructor(page: Page) {
    this.page = page
    this.currency = page.locator('#pc_currency')
    this.todayRate = page.locator('#sp_sell_rate')
    this.amount = page.locator('#pc_amount')
    this.inDollars = page.locator('#pc_inDollars_true')
    this.calculateCosts = page.locator('#pc_calculate_costs')
    this.conversation = page.locator('#pc_conversion_amount')
    this.clickBuy = page.locator('#purchase_cash')
    this.successMessage = page.locator('#alert_content')
  }

  async buy() {
    await this.currency.selectOption('EUR')
    await expect(this.todayRate).toBeVisible()
    await expect(this.todayRate).toContainText('1 euro (EUR)')
    await this.amount.type('500')
    await this.inDollars.click()
    await this.calculateCosts.click()
    await expect(this.conversation).toContainText('500.00 U.S. dollar (USD)')
    await this.clickBuy.click()
  }

  async assertSuccessMessage() {
    await expect(this.successMessage).toBeVisible()
    await expect(this.successMessage).toContainText(
      'Foreign currency cash was successfully purchased.',
    )
  }
}
