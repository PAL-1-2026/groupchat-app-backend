import { z } from 'zod';

export const MessageRequest = z.object({
    content: z.string().max(255, 'Messages should be at most 50 characters'),
});

export type MessageSchema = z.infer<typeof MessageRequest>;
