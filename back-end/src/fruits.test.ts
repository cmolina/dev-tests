import { expect, it } from 'vitest'
import { app } from './index'

it('should list fruits', async () => {
  const res = await app.request('/fruits')

  expect(res.status).toBe(200)
  expect(await res.json()).toEqual([])
})

it('should add a new fruit', async () => {
  const body = new FormData()
  body.append('name', 'Pomelo')
  const res = await app.request('/fruits', { method: 'post', body })

  expect(res.status).toBe(201)
  expect(await res.json()).toEqual({ name: 'Pomelo' })
})
