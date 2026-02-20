import * as messagesRepository from "@/apps/messages/messages.repository.ts"

export async function sendMessage(
    groupId: string,
    senderId: string,
    content: string
) {
    return await messagesRepository.sendMessage(groupId, senderId, content);
}

export async function getMessages(
    groupId: string,
    userId: string,
    cursor?: string,
    take: number = 20
) {
    return await messagesRepository.getMessages(groupId, userId, cursor, take);
}
