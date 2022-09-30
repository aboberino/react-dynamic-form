// src/server/router/index.ts
import { t } from "../trpc"

import { blocRouter } from "./bloc"

export const appRouter = t.router({
  bloc: blocRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter