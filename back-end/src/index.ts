import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { app as fruits } from './modules/fruit/fruit.routes.js'
import { app as varieties } from './modules/variety/variety.routes.js'
import { initORM } from './db.js'
import { RequestContext } from '@mikro-orm/core'

export async function bootstrap(test = false, port = 3000) {
  const db = await initORM()
  if (!test) {
    await db.orm.migrator.up()
  }

  const app = new Hono()

  app.use('*', (c, next) => RequestContext.create(db.em, next))
  app.on('close', '*', () => db.orm.close())

  app.route('/fruits', fruits)
  app.route('/varieties', varieties)

  console.log(`Server is running on port ${port}`)

  serve({
    fetch: app.fetch,
    port,
  })

  return app
}

