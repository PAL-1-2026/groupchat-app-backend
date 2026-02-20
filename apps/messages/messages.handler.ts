import type {NextFunction, Request, Response} from "express";
import * as messagesService from "@/apps/messages/messages.service.ts"
import {MessageRequest, type MessageSchema} from "@/apps/messages/messages.dto.ts";

export async function sendMessage(req: Request, res: Response, next: NextFunction): Promise<void> {
    const groupId: string = req.params['groupId'] as string;
    const senderId = res.locals.users.userId;
    const messageRequest: MessageSchema = MessageRequest.parse(req.body);

    const result = await messagesService.sendMessage(groupId, senderId, messageRequest.content)
    res.status(200).json(result)
}

export async function getMessages(req: Request, res: Response, next: NextFunction): Promise<void> {
    const groupId: string = req.params['groupId'] as string;
    const userId: string = res.locals.users.userId;

    // query params
    const cursor = req.query.cursor as string | undefined;
    const take = req.query.take ? Number(req.query.take) : 20;

    const result = await messagesService.getMessages(groupId, userId, cursor, take);

    res.status(200).json(result);
}
