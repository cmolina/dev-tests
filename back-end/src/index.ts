import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import fruits from './modules/fruit/fruit.routes.js'
import varieties from './modules/variety/variety.routes.js'
import clients from './modules/client/client.routes.js'
import farmers from './modules/farmer/farmer.routes.js'
import fields from './modules/field/field.routes.js'
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
  app.route('/clients', clients)
  app.route('/farmers', farmers)
  app.route('/fields', fields)

  console.log(`Server is running on port ${port}`)

  serve({
    fetch: app.fetch,
    port,
  })

  return app
}

