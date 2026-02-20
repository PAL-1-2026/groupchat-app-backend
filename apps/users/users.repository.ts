import type {User} from "@/apps/users/users.dto.ts";
import {prisma} from "@/databases/prisma.ts";
import {AppError} from '@/errors/AppError';
import errorManagement from '@/errors/errorManagement';

export async function create(user: User): Promise<User> {
    return prisma.user.create({
        data: {
            username: user.username,
            password: user.password,
        },
    });
}

export async function getByUsername(username: string): Promise<User> {
    const user = await prisma.user.findUnique({
        where: {username}
    });

    if (!user) throw new AppError(errorManagement.commonErrors.NotFound, 'user not found', true);
    return user;
}
