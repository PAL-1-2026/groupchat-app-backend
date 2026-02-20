import * as messagesRepository from "@/apps/messages/messages.repository.ts"
import {getIO} from "@/libraries/socket/socket.ts";

export async function sendMessage(
    groupId: string,
    senderId: string,
    content: string
) {
    const message = await messagesRepository.sendMessage(groupId, senderId, content);

    const io = getIO();
    io.to(groupId).emit("message", message);

    return message;
}

export async function getMessages(
    groupId: string,
    userId: string,
    cursor?: string,
    take: number = 20
) {
    return await messagesRepository.getMessages(groupId, userId, cursor, take);
}
