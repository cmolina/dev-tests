import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { app as fruits } from './fruits'

export const app = new Hono()
app.route('/fruits', fruits)

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
