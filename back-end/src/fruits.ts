import { serve } from '@hono/node-server'
import { Hono } from 'hono'

export const app = new Hono()

app.get('/', (c) => {
  return c.json([])
})

app.post('/', (c) => {
  return c.json({ name: 'Pomelo' }, 201)
})
