import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { FeedbackPage } from '../../page-objects/FeedbackPage'

test.describe.parallel('Feedback form', () => {
  let homePage: HomePage
  let feedbackPage: FeedbackPage

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    feedbackPage = new FeedbackPage(page)
    await homePage.visit()
    await homePage.clickFeedbackLink()
  })

  test('Reset feedback form', async ({ page }) => {
    await feedbackPage.fillForm(
      'Yuliia',
      'yuliia@gmail.com',
      'Test subject',
      'Test comment',
    )
    await feedbackPage.resetForm()
    await feedbackPage.assertReset()
  })

  test('Submit feedback form', async ({ page }) => {
    await feedbackPage.fillForm(
      'Yuliia',
      'yuliia@gmail.com',
      'Test subject',
      'Test comment',
    )
    await feedbackPage.submitForm()
    await feedbackPage.feedbackConfirmation()
  })
})
