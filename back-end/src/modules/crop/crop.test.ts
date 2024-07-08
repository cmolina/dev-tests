/// <reference types='vite/client' />
import { expect, it, beforeAll } from 'vitest'
import { type Hono } from 'hono'
import { bootstrapTest } from '../../test-utils.js'
import { type Crop } from './crop.entity.js'
import { RequiredEntityData } from '@mikro-orm/core'
import { Client } from '../client/client.entity.js'
import { Fruit } from '../fruit/fruit.entity.js'
import { Field } from '../field/field.entity.js'
import { initORM } from '../../db.js'
import { Farmer } from '../farmer/farmer.entity.js'

let app: Hono
let client: Client
let fruit: Fruit
let field: Field
beforeAll(async () => {
  app = await bootstrapTest()

  const em = (await initORM()).orm.em.fork()
  client = em.create(Client, { email: 'lcummerata@email.com', firstName: 'Lea', lastName: 'Cummerata' })
  fruit = em.create(Fruit, { name: 'brocoli', variety: 'large' })
  const farmer = em.create(Farmer, { email: 'lcummerata@email.com', firstName: 'Lea', lastName: 'Cummerata' })
  field = em.create(Field, { name: 'voluptatem', location: '139 Lucio Tunnel', farmer })
  await em.persistAndFlush([client, fruit, field])
})

it('should list crops', async () => {
  const res = await app.request('/crops')

  expect(res.status).toBe(200)
  expect(await res.json()).toEqual([])
})

type NewCropPayload = RequiredEntityData<Crop>

it('should add a new crop', async () => {
  const body = JSON.stringify({ client: client.id, fruit: fruit.id, field: field.id } as NewCropPayload)

  const res = await app.request('/crops', { method: 'post', body })

  expect(res.status).toBe(201)
  expect(await res.json()).toEqual(expect.objectContaining({ client: client.id, fruit: fruit.id, field: field.id }))
})


it('should persist new crops', async () => {
  const body = JSON.stringify({ client: client.id, fruit: fruit.id, field: field.id } as NewCropPayload)
  await app.request('/crops', { method: 'post', body })

  const res = await app.request('/crops')

  expect(res.status).toBe(200)
  expect(await res.json()).toContainEqual(expect.objectContaining({ client, fruit, field }))
})

it('should bulk import from csv', async () => {
  const body = new Blob([(await import('../../../cosechas.csv?raw')).default], { type: 'text/csv' });

  const res = await app.request('/crops/bulk-import', { method: 'post', body })

  expect(res.status).toBe(201)
  const { crops, errors } = await res.json() as { crops: Crop[], errors: string[] }
  expect(errors).toHaveLength(0)
  expect(crops[0]).toMatchObject({
    client: { firstName: 'Lea', lastName: 'Cummerata', email: 'lcummerata@email.com' },
    fruit: { name: 'brocoli', variety: 'large' },
    field: { name: 'voluptatem ', location: '139 Lucio Tunnel', farmer: { firstName: 'Madison', lastName: 'Treutel', email: 'mtreutel@email.com' } },
  })
})
