import { onesta } from '$lib';
import { fail, redirect } from '@sveltejs/kit'
import type { Actions } from './$types'
import { z, ZodError } from 'zod'

export async function load() {
  const [growers, clients, commodities] = await Promise.all([
    onesta.GET('/v1/growers/').then(({ data }) => data?.growers ?? []),
    onesta.GET('/v1/clients/').then(({ data }) => data?.clients ?? []),
    onesta.GET('/v1/commodities/').then(({ data }) => data?.commodities ?? []),
  ])
  return { growers, clients, commodities }
}

const payloadSchema = z.object({
  growerId: z.string(),
  farmId: z.string(),
  clientId: z.string(),
  commodityId: z.string(),
  varietyId: z.string(),
})

type PayloadSchema = z.infer<typeof payloadSchema>

export const actions = {
  default: async (event) => {
    const formData = await event.request.formData()
    try {
      const body = payloadSchema.parse(Object.fromEntries(formData.entries()))
      await onesta.POST('/v1/harvests/', { body })
    } catch (error) {
      if (error instanceof ZodError) {
        return fail(422, error.format() as z.ZodFormattedError<PayloadSchema>)
      }
      return fail(500, { message: String(error) })
    }
    throw redirect(303, '/harvests')
  }
} satisfies Actions
