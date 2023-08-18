import { expect, Locator, Page } from '@playwright/test' //expect - for using assertion functions, locators to store selectors, onject of class page
import { AbstractPage } from './AbstractPage'

export class LoginPage extends AbstractPage {
  //Define selectors
  //readonly page:Page - define page if no Abstract page
  readonly usernameInput: Locator
  readonly passwordInput: Locator
  readonly submitButton: Locator
  readonly errorMessage: Locator
  readonly loginForm: Locator //for taking snaphot of login form

  //Init selectors using constructor
  constructor(page: Page) {
    //this.page=page --in case if no Abstract Page
    super(page)
    this.usernameInput = page.locator('#user_login')
    this.passwordInput = page.locator('#user_password')
    this.submitButton = page.locator('text=Sign in')
    this.errorMessage = page.locator('.alert-error')
    this.passwordInput = page.locator('#user_password')
    this.loginForm = page.locator('#login_form')
  }
  //Define login page methods
  async visit() {
    await this.page.goto('http://zero.webappsecurity.com')
  }

  async login(username: string, password: string) {
    await this.usernameInput.type(username)
    await this.passwordInput.type(password)
    await this.submitButton.click()
  }

  async assertError() {
    await expect(this.errorMessage).toContainText(
      'Login and/or password are wrong.',
    )
  }

  async logout() {
    await this.page.goto('http://zero.webappsecurity.com/logout.html')
    await expect(this.page).toHaveURL(
      'http://zero.webappsecurity.com/index.html',
    )
  }

  //take snaphot of login form
  async loginFormSnapshot() {
    expect(await this.loginForm.screenshot()).toMatchSnapshot('Login-Form.png')
  }

  //take snaphot of login form error
  async loginFormErrorSnapshot() {
    expect(await this.loginForm.screenshot()).toMatchSnapshot(
      'Login-Form-Error.png',
    )
  }
}
