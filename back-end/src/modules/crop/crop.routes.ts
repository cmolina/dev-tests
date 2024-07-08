import { Hono } from 'hono'
import { ZodError } from 'zod'
import { initORM } from '../../db.js'
import { Crop } from './crop.entity.js'
import { farmerSchema } from '../farmer/farmer.schema.js'
import { clientSchema } from '../client/client.schema.js'
import { fieldSchema } from '../field/field.schema.js'
import { fruitSchema } from '../fruit/fruit.schema.js'

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
      const farmer = await db.farmer.upsert(farmerSchema.parse({ email: farmerEmail, firstName: farmerFirstName, lastName: farmerLastName }))
      const field = await db.field.upsert(fieldSchema.parse({ name: fieldName, location: fieldLocation, farmer }))
      const client = await db.client.upsert(clientSchema.parse({ email: clientEmail, firstName: clientFirstName, lastName: clientLastName }))
      const fruit = await db.fruit.upsert(fruitSchema.parse({ name: fruitName, variety: fruitVariety }))

      const crop = await db.crop.create({ client, fruit, field })
      crops.push(crop)
    } catch (error) {
      let message = String(error)
      if (error instanceof ZodError) {
        message = JSON.stringify(error.flatten().fieldErrors)
      }
      errors.push(`Row ${r + 1}: ${message}`)
    }
  }
  await db.em.flush()

  crops = await db.crop.find(crops.map(c => c.id), { populate: ['$infer', 'field.farmer'] })
  return c.json({ crops, errors }, 201)
})

export default app
