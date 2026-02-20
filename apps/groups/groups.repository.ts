import {prisma} from "@/databases/prisma.ts";
import {Prisma} from "@/generated/prisma/client.ts";
import errorManagement from "@/errors/errorManagement.ts";
import {AppError} from "@/errors/AppError.ts";

export async function join(groupId: string, userId: string): Promise<void> {
    await prisma.group.upsert({
        where: { id: groupId },
        update: {
            users: {
                connect: { id: userId }
            }
        },
        create: {
            id: groupId,
            users: {
                connect: { id: userId }
            }
        }
    });
}

export async function getUserGroups(userId: string) {
    const groups = await prisma.group.findMany({
        where: {
            users: {
                some: { id: userId }
            },
            deletedAt: null,
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    return groups;
}

export async function leave(groupId: string, userId: string): Promise<void> {
    try {
        await prisma.group.update({
            where: { id: groupId },
            data: {
                users: {
                    disconnect: { id: userId }
                }
            }
        });
    } catch (error) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2025"
        ) {
            throw new AppError(errorManagement.commonErrors.NotFound, "group not found", true);
        }

        throw error;
    }
}


