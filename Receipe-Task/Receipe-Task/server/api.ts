import express from 'express'
import cors from 'cors'

import { createExpressMiddleware } from '@trpc/server/adapters/express'
import { expressHandler } from 'trpc-playground/handlers/express'
import { appRouter } from './main/MainRouter'
import { createContext } from './main/context'

const runApp=async ()=>{
  const app = express()
  const trpcApiEndpoint = '/trpc'
  const playgroundEndpoint = '/trpc-playground'

  app.use(cors({ origin: 'http://localhost:5173' }))

  app.use(
    trpcApiEndpoint,
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  )
  app.use(
    playgroundEndpoint,
    await expressHandler({
      trpcApiEndpoint,
      playgroundEndpoint,
      router: appRouter,
    }),
  )

  app.listen(3000, () => console.log('Server started on port 3000'))
}
runApp()
export type AppRouter = typeof appRouter