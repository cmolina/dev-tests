import { z } from 'zod'
import { Client } from '../client/client.entity.js'
import { Fruit } from '../fruit/fruit.entity.js'
import { Field } from '../field/field.entity.js'

export const cropSchema = z.object({
  client: z.instanceof(Client).or(z.number()),
  fruit: z.instanceof(Fruit).or(z.number()),
  field: z.instanceof(Field).or(z.number()),
})
