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

app.post('/bulk-import', async (c) => {
  const db = await initORM()

  let crops: Crop[] = []
  const errors: string[] = []

  const rows = (await c.req.text()).split('\r\n')
  for (let r = 1; r < rows.length; r++) {
    const [
      farmerEmail, farmerFirstName, farmerLastName,
      clientEmail, clientFirstName, clientLastName,
      fieldName, fieldLocation,
      fruitName, fruitVariety
    ] = rows[r].split(';')

    try {
      const farmer = await db.farmer.upsert({ email: farmerEmail, firstName: farmerFirstName, lastName: farmerLastName })
      const field = await db.field.upsert({ name: fieldName, location: fieldLocation, farmer })
      const client = await db.client.upsert({ email: clientEmail, firstName: clientFirstName, lastName: clientLastName })
      const fruit = await db.fruit.upsert({ name: fruitName, variety: fruitVariety })

      const crop = await db.crop.create({ client, fruit, field })
      crops.push(crop)
    } catch (error) {
      errors.push(`Row ${r + 2}: ${error}`)
    }
  }
  await db.em.flush()

  crops = await db.crop.find(crops.map(c => c.id), { populate: ['$infer', 'field.farmer'] })
  return c.json({ crops, errors }, 201)
})

export default app
