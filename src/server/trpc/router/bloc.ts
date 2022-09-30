import { t } from "../trpc"
import { z } from "zod"

export const blocRouter = t.router({
    getAll: t.procedure.query(({ ctx }) => {
        return ctx.prisma.bloc.findMany()
    }),
    getByCode: t.procedure
        .input(z.object({ code: z.string() }))
        .query(({ ctx, input }) => {
            const { code } = input
            // return ctx.prisma.bloc.findFirst({ where: { code: input.code }, include: { inputs: true } })
            return ctx.prisma.bloc.findFirst({ 
                where: { code },
                include: {
                    inputs: {
                        include: {
                            options: true
                        }
                    }
                }
            })
        }),
})