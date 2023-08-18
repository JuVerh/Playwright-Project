import { expect, Locator, Page } from '@playwright/test'

export class HomePage {
  readonly page: Page
  readonly signInButton: Locator
  readonly searchBox: Locator
  readonly numberOfLinks: Locator
  readonly feedbackLink: Locator

  constructor(page: Page) {
    this.page = page
    this.signInButton = page.locator('#signin_button')
    this.searchBox = page.locator('#searchTerm')
    this.numberOfLinks = page.locator('li > a')
    this.feedbackLink = page.locator('#feedback')
  }

  async visit() {
    await this.page.goto('http://zero.webappsecurity.com')
  }

  async signIn() {
    await this.signInButton.click()
  }

  async clickFeedbackLink() {
    await this.feedbackLink.click()
  }

  async searchFor(phrase: string) {
    await this.searchBox.type(phrase)
    await this.page.keyboard.press('Enter')
    await expect(this.numberOfLinks).toHaveCount(2)
  }
}
