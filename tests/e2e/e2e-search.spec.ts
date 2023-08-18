import { test } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'

test.describe('Search', () => {
  test('Should find result', async ({ page }) => {
    let homePage: HomePage = new HomePage(page)
    await homePage.visit()
    await homePage.searchFor('bank')
  })
})
