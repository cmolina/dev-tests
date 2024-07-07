import { Hono } from 'hono'
import { initORM } from '../../db.js'
import { Variety } from './variety.entity.js'

export const app = new Hono()

app.get('/', async (c) => {
  const db = await initORM()
  const varieties = await db.variety.findAll()
  return c.json(varieties)
})

app.post('/', async (c) => {
  const db = await initORM()
  const body = await c.req.json<Variety>()
  const variety = db.variety.create(body)
  await db.em.flush()
  return c.json(variety, 201)
})
