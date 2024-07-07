import { expect, it, beforeAll } from 'vitest'
import { type Hono } from 'hono'
import { bootstrapTest } from '../../test-utils.js'

let app: Hono
beforeAll(async () => {
  app = await bootstrapTest()
})

it('should list varieties', async () => {
  const res = await app.request('/varieties')

  expect(res.status).toBe(200)
  expect(await res.json()).toEqual([])
})

it('should add a new variety', async () => {
  const body = JSON.stringify({ name: 'large' })
  const res = await app.request('/varieties', { method: 'post', body })

  expect(res.status).toBe(201)
  expect(await res.json()).toEqual(expect.objectContaining({ name: 'large' }))
})

it('should persist new varieties', async () => {
  const body = JSON.stringify({ name: 'extra large' })
  await app.request('/varieties', { method: 'post', body })

  const res = await app.request('/varieties')

  expect(res.status).toBe(200)
  expect(await res.json()).toContainEqual(expect.objectContaining({ name: 'extra large' }))
})
