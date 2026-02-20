import { z } from "zod";

export const LoginRequest = z.object({
    username: z.string('Invalid username format'),
    password: z.string().min(6, 'Password should be at least 6 characters'),
});

export type LoginResponse = {
    jwt: string;
};

export type LoginSchema = z.infer<typeof LoginRequest>;
