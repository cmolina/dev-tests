import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import fruits from './modules/fruit/fruit.routes.js'
import clients from './modules/client/client.routes.js'
import farmers from './modules/farmer/farmer.routes.js'
import fields from './modules/field/field.routes.js'
import crops from './modules/crop/crop.routes.js'
import { initORM } from './db.js'
import { RequestContext, UniqueConstraintViolationException } from '@mikro-orm/core'

export async function bootstrap(test = false, port = 3000) {
  const db = await initORM()
  if (!test) {
    await db.orm.migrator.up()
  }

  const app = new Hono()

  app.use('*', (c, next) => RequestContext.create(db.em, next))
  app.on('close', '*', () => db.orm.close())
  app.onError((error, c) => {
    if (error instanceof UniqueConstraintViolationException) {
      const columns = error.message.match(/UNIQUE constraint failed: (.*)/)![1]
        .split(', ')
        .map(s => s.split('.')[1])
      return c.json({
        errors: Object.fromEntries(columns.map((column) => [column, ['Duplicated']]))
      }, 400)
    }
    console.error('Unexpected error', error)
    return c.text(String(error), 500)
  })

  app.route('/fruits', fruits)
  app.route('/clients', clients)
  app.route('/farmers', farmers)
  app.route('/fields', fields)
  app.route('/crops', crops)

  console.log(`Server is running on port ${port}`)

  serve({
    fetch: app.fetch,
    port,
  })

  return app
}

