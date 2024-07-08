import { Hono } from 'hono'
import { initORM } from '../../db.js'
import { Crop } from './crop.entity.js'

const app = new Hono()

app.get('/', async (c) => {
  const db = await initORM()
  const crops = await db.crop.findAll({ populate: ['client', 'fruit', 'field', 'field.farmer'] })
  return c.json(crops)
})

app.post('/', async (c) => {
  const db = await initORM()
  const body = await c.req.json<Crop>()
  const crop = db.crop.create(body)
  await db.em.flush()
  return c.json(crop, 201)
})

export default app
