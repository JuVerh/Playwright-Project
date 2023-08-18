import { test, expect } from '@playwright/test'

test.describe.parallel('API testing', () => {
  const baseUrl = 'https://reqres.in/api'

  test('Assert response status (valid value)', async ({ request }) => {
    const response = await request.get(`${baseUrl}/users/3`)
    expect(response.status()).toBe(200)

    //Parse response body
    const responseBody = await JSON.parse(await response.text())
    //Print response body
    //console.log(responseBody)
  })

  test('Assert response status (invalid value)', async ({ request }) => {
    const response = await request.get(`${baseUrl}/user/not-exist`)
    expect(response.status()).toBe(404)
  })

  test('GET user details', async ({ request }) => {
    const response = await request.get(`${baseUrl}/users/2`)
    const responseBody = await JSON.parse(await response.text())
    expect(response.status()).toBe(200)
    expect(responseBody.data.id).toBe(2)
    expect(responseBody.data.first_name).toContain('Janet')
    expect(responseBody.data.last_name).toContain('Weaver')
    expect(responseBody.data.email).toBeTruthy()
    //console.log(responseBody)
  })

  test('POST new user', async ({ request }) => {
    const response = await request.post(`${baseUrl}/user`, {
      data: {
        id: 1000,
        name: 'Julia',
        job: 'QA',
      },
    })
    const responseBody = await JSON.parse(await response.text())
    expect(responseBody.id).toBe(1000)
    expect(responseBody.createdAt).toBeTruthy()
  })

  test('POST request - Login (success)', async ({ request }) => {
    const response = await request.post(`${baseUrl}/login`, {
      data: {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka',
      },
    })
    const responseBody = await JSON.parse(await response.text())
    expect(response.status()).toBe(200)
    expect(responseBody.token).toBeTruthy()
  })

  test('POST request - Login (fail)', async ({ request }) => {
    const response = await request.post(`${baseUrl}/login`, {
      data: {
        email: 'peter@klaven',
      },
    })
    const responseBody = await JSON.parse(await response.text())
    expect(response.status()).toBe(400)
    expect(responseBody.error).toBe('Missing password')
  })

  test('PUT request - change user details', async ({ request }) => {
    const response = await request.put(`${baseUrl}/users/2`, {
      data: {
        name: 'New name',
        job: 'New job',
      },
    })
    const responseBody = await JSON.parse(await response.text())
    expect(response.status()).toBe(200)
    expect(responseBody.name).toBe('New name')
    expect(responseBody.job).toBe('New job')
    expect(responseBody.updatedAt).toBeTruthy()
  })

  test('DELETE request - delete user', async ({ request }) => {
    const response = await request.delete(`${baseUrl}/users/2`)
    expect(response.status()).toBe(204)
  })
})
