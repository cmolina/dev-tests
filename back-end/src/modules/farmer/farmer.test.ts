import { expect, it, beforeAll } from 'vitest'
import { type Hono } from 'hono'
import { bootstrapTest } from '../../test-utils.js'
import { type Farmer } from './farmer.entity.js'

let app: Hono
beforeAll(async () => {
  app = await bootstrapTest()
})

it('should list farmers', async () => {
  const res = await app.request('/farmers')

  expect(res.status).toBe(200)
  expect(await res.json()).toEqual([])
})

it('should add a new farmer', async () => {
  const body = JSON.stringify({ email: 'lcummerata@email.com', firstName: 'Lea', lastName: 'Cummerata' } as Farmer)
  const res = await app.request('/farmers', { method: 'post', body })

  expect(res.status).toBe(201)
  expect(await res.json()).toEqual(expect.objectContaining({ email: 'lcummerata@email.com', firstName: 'Lea', lastName: 'Cummerata' }))
})

it('should persist new farmers', async () => {
  const body = JSON.stringify({ email: 'sschuppe@email.com', firstName: 'Salvador', lastName: 'Schuppe' } as Farmer)
  await app.request('/farmers', { method: 'post', body })

  const res = await app.request('/farmers')

  expect(res.status).toBe(200)
  expect(await res.json()).toContainEqual(expect.objectContaining({ email: 'sschuppe@email.com', firstName: 'Salvador', lastName: 'Schuppe' }))
})

it('should reject duplicated emails', async () => {
  const body = JSON.stringify({ email: 'taken@email.com', firstName: 'Already', lastName: 'Taken' } as Farmer)
  await app.request('/farmers', { method: 'post', body })

  const res = await app.request('/farmers', { method: 'post', body })

  expect(res.status).toBe(400)
  expect(await res.json()).toEqual({ errors: { email: ['Duplicated'] } })
})
