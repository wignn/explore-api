import { z, ZodType } from "zod";


export class BookmarkValidation {
    static readonly CREATE: ZodType = z.object({
        userId: z.string(),
        bookId: z.string(),
    })


    static readonly DELETE: ZodType = z.object({
        userId: z.string(),
        bookId: z.string(),
    })
}