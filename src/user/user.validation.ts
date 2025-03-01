import { z, ZodType } from 'zod'

export class UserValidation {


    static userResponse = z.object({
        id: z.string(),
        name: z.string().optional(),
        username: z.string(),
    });
    
    static readonly UPDATE: ZodType = z.object({
        name: z.string().min(3).max(255).optional(),
        bio: z.string().min(3).max(255).optional(),
        profilePic: z.string().min(3).max(255).optional()
    })


}