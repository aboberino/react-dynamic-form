// src/server/router/index.ts
import { t } from "../trpc"

import { exampleRouter } from "./example"
import { blocRouter } from "./bloc"

export const appRouter = t.router({
  example: exampleRouter,
  bloc: blocRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter