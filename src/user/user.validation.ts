import { z, ZodType } from 'zod'

export class UserValidation {
    static readonly REGISTER: ZodType = z.object({
        name: z.string().min(3).max(255).optional(),
        username: z.string().min(3).max(255).optional(),
        email: z.string().email().min(3).max(255).optional(),
        password: z.string().min(8).max(255).optional()
    })

    static userResponse = z.object({
        id: z.string(),
        name: z.string().optional(),
        username: z.string(),
    });
    
    static readonly UPDATE: ZodType = z.object({
        id: z.string(),
        name: z.string().min(3).max(255),
        username: z.string().min(3).max(255),
    })

    static readonly LOGIN: ZodType = z.object({
        username: z.string().min(3).max(255),
        password: z.string().min(8).max(255)
    })

    static readonly FORGOT_PASSWORD: ZodType = z.object({
        email: z.string().email().min(3).max(255)
    })

    static readonly RESET_PASSWORD: ZodType = z.object({
        email: z.string().min(3).max(100),
        password: z.string().min(6).max(100),
        valToken: z.string().min(2)
    })

    static readonly VERIFY_EMAIL: ZodType = z.object({
        valToken: z.string()
    })

    static readonly LOGOUT: ZodType = z.object({
        username: z.string().min(3).max(255),
    })
}