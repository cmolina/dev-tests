import { z } from 'zod'
import { Farmer } from '../farmer/farmer.entity.js'

export const fieldSchema = z.object({
  name: z.string().trim().min(1),
  location: z.string().trim().min(1),
  farmer: z.instanceof(Farmer).or(z.number()),
})
