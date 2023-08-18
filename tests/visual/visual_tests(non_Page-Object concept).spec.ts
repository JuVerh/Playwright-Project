import { test, expect } from '@playwright/test'

//to run this test: npx playwright test --config=visual_config.ts --project=chromium
//when run for the first time it will fail and save basic snapshot

test.describe('Visual regression testing example', () => {
  test('Full page snapshot', async ({ page }) => {
    await page.goto('https://www.example.com')
    await expect(await page.screenshot()).toMatchSnapshot('HomePage.png')
  })

  test('Single element snapshot', async ({ page }) => {
    await page.goto('https://www.example.com')
    const pageTitle = await page.$('h1')
    expect(await pageTitle.screenshot()).toMatchSnapshot('Title.png')
  })
})
