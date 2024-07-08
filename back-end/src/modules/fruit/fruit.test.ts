import { expect, it, beforeAll } from 'vitest'
import { type Hono } from 'hono'
import { bootstrapTest } from '../../test-utils.js'
import { Fruit } from './fruit.entity.js'

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
  const body = JSON.stringify({ name: 'Pomelo', variety: 'small' } as Fruit)
  const res = await app.request('/fruits', { method: 'post', body })

  expect(res.status).toBe(201)
  expect(await res.json()).toEqual(expect.objectContaining({ name: 'Pomelo', variety: 'small' }))
})

it('should persist new fruits', async () => {
  const body = JSON.stringify({ name: 'Naranja', variety: 'small' })
  await app.request('/fruits', { method: 'post', body })

  const res = await app.request('/fruits')

  expect(res.status).toBe(200)
  expect(await res.json()).toContainEqual(expect.objectContaining({ name: 'Naranja', variety: 'small' }))
})

it('should reject duplicated pairs of (name, variety)', async () => {
  const body = JSON.stringify({ name: 'apple', variety: 'small' })
  await app.request('/fruits', { method: 'post', body })

  const res = await app.request('/fruits', { method: 'post', body })

  expect(res.status).toBe(400)
  expect(await res.json()).toEqual({ errors: { name: ['Duplicated'], variety: ['Duplicated'] } })
})
