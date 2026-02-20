import type {Message} from "@/generated/prisma/client.ts";
import {prisma} from "@/databases/prisma.ts";
import {AppError} from "@/errors/AppError.ts";
import errorManagement from "@/errors/errorManagement.ts";

export async function sendMessage(
    groupId: string,
    senderId: string,
    content: string
): Promise<Message> {
    // check membership
    const group = await prisma.group.findFirst({
        where: {
            id: groupId,
            users: {
                some: {id: senderId}
            }
        },
        select: {id: true}
    });

    if (!group) {
        throw new AppError(
            errorManagement.commonErrors.Forbidden,
            'user not enrolled in group',
            true
        );
    }

    // create message
    return prisma.message.create({
        data: {
            content,
            senderId,
            groupId
        },
        include: {
            sender: {
                select: {id: true, username: true}
            }
        }
    });
}

export async function getMessages(
    groupId: string,
    userId: string,
    cursor?: string,
    take: number = 20
): Promise<{ messages: Message[]; nextCursor?: string }> {

    // check membership
    const group = await prisma.group.findFirst({
        where: {
            id: groupId,
            users: {some: {id: userId}}
        },
        select: {id: true}
    });

    if (!group) {
        throw new AppError(
            errorManagement.commonErrors.Forbidden,
            'user not enrolled in group',
            true
        );
    }

    // query messages
    const messages = await prisma.message.findMany({
        where: {groupId},
        orderBy: {createdAt: 'desc'},
        take,
        ...(cursor && {
            cursor: {id: cursor},
            skip: 1
        }),
        include: {
            sender: {
                select: {id: true, username: true}
            }
        }
    });

    const nextCursor = messages.length === take
        ? messages[messages.length - 1].id
        : undefined;

    return {messages, nextCursor};
}
