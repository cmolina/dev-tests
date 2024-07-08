import { z } from 'zod'

export const fruitSchema = z.object({
  name: z.string().trim().min(1),
  variety: z.string().trim().min(1),
})
