import { expect, it } from 'vitest'
import { app } from './index'

it('should greet', async () => {
  const res = await app.request('/')

  expect(res.status).toBe(200)
  expect(await res.text()).toBe('Hello Hono!')
})
