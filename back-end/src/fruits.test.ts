import { expect, it } from 'vitest'
import { app } from './index'

it('should list fruits', async () => {
  const res = await app.request('/fruits')

  expect(res.status).toBe(200)
  expect(await res.json()).toEqual([])
})
