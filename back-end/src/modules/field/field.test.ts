import { expect, it, beforeAll } from 'vitest'
import { type Hono } from 'hono'
import { bootstrapTest } from '../../test-utils.js'
import { type Field } from './field.entity.js'
import { RequiredEntityData } from '@mikro-orm/core'
import { Farmer } from '../farmer/farmer.entity.js'
import { initORM } from '../../db.js'

let app: Hono
let farmer: Farmer
beforeAll(async () => {
  app = await bootstrapTest()

  const em = (await initORM()).orm.em.fork()
  farmer = em.create(Farmer, { email: 'lcummerata@email.com', firstName: 'Lea', lastName: 'Cummerata' })
  await em.persistAndFlush(farmer)
})

it('should list fields', async () => {
  const res = await app.request('/fields')

  expect(res.status).toBe(200)
  expect(await res.json()).toEqual([])
})

type NewFieldPayload = RequiredEntityData<Field>

it('should add a new field', async () => {
  const body = JSON.stringify({ name: 'voluptatem', location: '139 Lucio Tunnel', farmer: farmer.id } as NewFieldPayload)
  const res = await app.request('/fields', { method: 'post', body })

  expect(res.status).toBe(201)
  expect(await res.json()).toEqual(expect.objectContaining({ name: 'voluptatem', location: '139 Lucio Tunnel', farmer: farmer.id }))
})

it('should persist new fields', async () => {
  const body = JSON.stringify({ name: 'quaerat aut', location: '18764 Johathan Forks', farmer: farmer.id } as NewFieldPayload)
  await app.request('/fields', { method: 'post', body })

  const res = await app.request('/fields')

  expect(res.status).toBe(200)
  expect(await res.json()).toContainEqual(expect.objectContaining({ name: 'quaerat aut', location: '18764 Johathan Forks', farmer }))
})

it('should reject duplicated pairs of (name, location)', async () => {
  const body = JSON.stringify({ name: 'Existing Name', location: 'Existing Location', farmer: farmer.id } as NewFieldPayload)
  await app.request('/fields', { method: 'post', body })

  const res = await app.request('/fields', { method: 'post', body })

  expect(res.status).toBe(400)
  expect(await res.json()).toEqual({ errors: { name: ['Duplicated'], location: ['Duplicated'] } })
})
