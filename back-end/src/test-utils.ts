import { bootstrap } from './index'
import { initORM } from './db'

export async function bootstrapTest() {
  const db = await initORM({
    debug: false,
    dbName: ':memory:',
    tsNode: true,
  })

  await db.orm.schema.createSchema()

  return bootstrap(true, Math.round(3000 + Math.random() * 100))
}
