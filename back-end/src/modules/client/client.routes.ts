import { Hono } from 'hono'
import { initORM } from '../../db.js'
import { Client } from './client.entity.js'

export const app = new Hono()

app.get('/', async (c) => {
  const db = await initORM()
  const clients = await db.client.findAll()
  return c.json(clients)
})

app.post('/', async (c) => {
  const db = await initORM()
  const body = await c.req.json<Client>()
  const client = db.client.create(body)
  await db.em.flush()
  return c.json(client, 201)
})
