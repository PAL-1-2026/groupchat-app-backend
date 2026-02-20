import express from "express";
import {getMessages, sendMessage} from "@/apps/messages/messages.handler.ts";

const messagesRouter = express.Router();

messagesRouter
    .post('/:groupId', sendMessage)
    .get('/:groupId', getMessages)

export default messagesRouter;
