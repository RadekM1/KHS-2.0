import { z } from "zod";

export const userRowSchema = z.object({
    account: z.string(),
    ban_time_stamp: z.date(),
    clearance: z.string(),
    last_name: z.string(),
    locked: z.boolean(),
    name: z.string(),
    verification_token_expire: z.string()
})

export const userRowsSchema = z.array(userRowSchema)

export type UserRowsSchema = z.infer<typeof userRowsSchema>