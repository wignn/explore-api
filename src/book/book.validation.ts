import { ZodType, z } from "zod";

export class BookValidation {
    static readonly CREATE: ZodType = z.object({
        cover: z.string().min(3),
        title: z.string().min(3),
        author: z.string().min(3),
        description: z.string().min(3),
        status: z.enum(['Completed', 'Drop', 'Ongoing']).optional(),
        language: z.enum(['English', 'Japanese', 'Korean']).optional(),
        realaseDate: z.number().min(3).optional()
    })

    static readonly UPDATE: ZodType = z.object({
        title: z.string().min(3).optional(),
        author: z.string().min(3).optional(),
        description: z.string().min(3).optional(),
        cover: z.string().min(3).optional(),
        asset: z.string().min(3).optional(),
        status: z.string().min(3).optional(),
        language: z.string().min(3).optional(),
        realaseDate: z.number().min(3).optional()
    })
}