import { test } from '@playwright/test'
import { getRandomNumber, getRandomString } from '../../utils/data-helpers'

test.describe('Useful tips', () => {
  test('Test object info', async ({ page }, testInfo) => {
    await page.goto('https://www.example.com')
    //print monitoring info
    console.log(testInfo.title)

    //print random number
    let newNumber = await getRandomNumber()
    console.log(newNumber)

    //print random string
    let newString = await getRandomString()
    console.log(newString)
  })

  test('Skip browser', async ({ page, browserName }) => {
    test.skip(
      browserName === 'chromium',
      'This Feature is not available for Chrome',
    )
    await page.goto('https://www.example.com') //run test only for webkit & firefox
  })

  test('Fixme annotation', async ({ page, browserName }) => {
    test.fixme(browserName === 'chromium', 'This test is need to be fixed')
    await page.goto('https://www.example.com') //run test only for webkit & firefox
  })

  //Parametrized test that select values from array
  const people = ['Julia', 'Helen'] //separate instance of browser will open for each value
  for (const name of people) {
    test(`Running test for ${name}`, async ({ page }) => {
      await page.goto('http://zero.webappsecurity.com')
      await page.type('#searchTerm', `${name}`)
      await page.waitForTimeout(3000)
    })
  }
  test('Multiple tabs in one browser', async ({ browser }) => {
    // Create a new incognito browser context
    const context = await browser.newContext()

    // Create a new page inside context.
    const page1 = await context.newPage()
    const page2 = await context.newPage()

    await page1.goto('https://example.com')
    await page2.goto('https://example.com')

    await page1.waitForTimeout(3000)
    // Dispose context once it's no longer needed.
    await context.close()
  })
})
