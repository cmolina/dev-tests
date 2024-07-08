import { Hono } from 'hono'
import { initORM } from '../../db.js'
import { fruitSchema } from './fruit.schema.js'

const app = new Hono()

app.get('/', async (c) => {
  const db = await initORM()
  const fruits = await db.fruit.findAll()
  return c.json(fruits)
})

app.post('/', async (c) => {
  const db = await initORM()
  const body = fruitSchema.parse(await c.req.json())
  const fruit = db.fruit.create(body)
  await db.em.flush()
  return c.json(fruit, 201)
})

export default app
