
import { ZodType, z } from "zod";


export class ChapterValidation {
    static readonly CREATE: ZodType = z.object({
        bookId: z.string().min(3),
        title: z.string().min(3),
        content: z.string().min(3),
        description: z.string().min(3),
    })

    static readonly UPDATE: ZodType = z.object({
        title: z.string().min(3).optional(),
        content: z.string().min(3).optional(),
        description: z.string().min(3).optional(),   })
}