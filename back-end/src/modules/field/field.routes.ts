import { Hono } from 'hono'
import { initORM } from '../../db.js'
import { fieldSchema } from './field.schema.js'

const app = new Hono()

app.get('/', async (c) => {
  const db = await initORM()
  const fields = await db.field.findAll({ populate: ['farmer'] })
  return c.json(fields)
})

app.post('/', async (c) => {
  const db = await initORM()
  const body = fieldSchema.parse(await c.req.json())
  const field = db.field.create(body)
  await db.em.flush()
  return c.json(field, 201)
})

export default app
