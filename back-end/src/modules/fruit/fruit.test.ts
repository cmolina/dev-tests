import { expect, it, beforeAll } from 'vitest'
import { type Hono } from 'hono'
import { bootstrapTest } from '../../test-utils.js'

let app: Hono
beforeAll(async () => {
  app = await bootstrapTest()
})

it('should list fruits', async () => {
  const res = await app.request('/fruits')

  expect(res.status).toBe(200)
  expect(await res.json()).toEqual([])
})

it('should add a new fruit', async () => {
  const body = JSON.stringify({ name: 'Pomelo' })
  const res = await app.request('/fruits', { method: 'post', body })

  expect(res.status).toBe(201)
  expect(await res.json()).toEqual(expect.objectContaining({ name: 'Pomelo' }))
})

it('should persist new fruits', async () => {
  const body = JSON.stringify({ name: 'Naranja' })
  await app.request('/fruits', { method: 'post', body })

  const res = await app.request('/fruits')

  expect(res.status).toBe(200)
  expect(await res.json()).toContainEqual(expect.objectContaining({ name: 'Naranja' }))
})
