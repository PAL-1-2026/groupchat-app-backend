import { z } from 'zod';

export const RegisterRequest = z.object({
    username: z.string().min(3, 'Username should be at least 3 characters').max(50, 'Username should be at most 50 characters'),
    password: z.string().min(6, 'Password should be at least 6 characters'),
});

export type RegisterSchema = z.infer<typeof RegisterRequest>;

export type UserResponse = {
    id: string;
    username: string;
    createdAt: Date;
    updatedAt: Date;
};

export type User = {
    id: string;
    username: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}
