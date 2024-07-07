import { Hono } from 'hono'
import { initORM } from '../../db.js'
import { Fruit } from './fruit.entity.js'

const app = new Hono()

app.get('/', async (c) => {
  const db = await initORM()
  const fruits = await db.fruit.findAll()
  return c.json(fruits)
})

app.post('/', async (c) => {
  const db = await initORM()
  const body = await c.req.json<Fruit>()
  const fruit = db.fruit.create(body)
  await db.em.flush()
  return c.json(fruit, 201)
})

export default app
