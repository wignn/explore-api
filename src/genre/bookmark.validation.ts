import { title } from "process";
import { z, ZodType } from "zod";


export class BookmarkValidation {
    static readonly CREATE: ZodType = z.object({
        title: z.string().min(3).max(255),
        description: z.string().min(3).max(255),
    })

    static readonly UPDATE: ZodType = z.object({
        title: z.string().min(3).max(255).optional(),
        description: z.string().min(3).max(255).optional(),
    })


    static readonly GET: ZodType = z.object({
        id: z.string(),
        title: z.string().min(3).max(255),
        description: z.string().min(3).max(255),
    })
}