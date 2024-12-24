import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { cache } from 'hono/cache'
import { cors } from 'hono/cors'
import { etag } from 'hono/etag'
import { logger } from 'hono/logger'
import { secureHeaders } from 'hono/secure-headers'
import { timeout } from 'hono/timeout'
import { z } from 'zod'
import tokens from '../public/api/tokens.json'

const validTokenIds = tokens.map((token) => token.id) as [string, ...string[]]

const schema = z.object({
  id: z.enum(validTokenIds, { message: 'Invalid token id' }),
})

const app = new Hono()
app.use(
  cors({
    origin: '*',
    maxAge: 30,
    allowMethods: ['GET'],
    allowHeaders: ['*'],
  })
)
app.use(logger())
app.use('/api/*', secureHeaders())
app.use('/api/*', etag())
app.use('/api', timeout(1_000))
app.use(
  cache({
    cacheName: 'simplr-coin-rates',
    cacheControl: 'max-age=30',
  })
)

app.notFound((c) => {
  return c.json({ error: 'Not found' }, 404)
})

app.get('/', (c) => {
  return c.redirect('https://github.com/simplr-sh/coin-rates', 302)
})

app.get(
  '/api/rates/:id',
  zValidator('param', schema, (result, c) => {
    if (!result.success) {
      return c.json({ error: result.error.issues?.[0]?.message }, 400)
    }
  }),
  async (c) => {
    const { id } = c.req.valid('param')
    const response = (await fetch(`https://api.coincap.io/v2/rates/${id}`).then(
      (res) => res.json()
    )) as { data: { symbol: string; rateUsd: string } }

    return c.json({
      [response.data.symbol.toLocaleLowerCase()]: {
        usd: +response.data.rateUsd,
      },
    })
  }
)

export default app
