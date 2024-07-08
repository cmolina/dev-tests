import { Hono } from 'hono'
import { initORM } from '../../db.js'
import { farmerSchema } from './farmer.schema.js'

const app = new Hono()

app.get('/', async (c) => {
  const db = await initORM()
  const farmers = await db.farmer.findAll()
  return c.json(farmers)
})

app.post('/', async (c) => {
  const db = await initORM()
  const body = farmerSchema.parse(await c.req.json())
  const farmer = db.farmer.create(body)
  await db.em.flush()
  return c.json(farmer, 201)
})

export default app
