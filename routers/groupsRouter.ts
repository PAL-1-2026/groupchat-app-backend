import express from "express";
import {join, leave} from "@/apps/groups/groups.handler.ts";

const groupsRouter = express.Router();

groupsRouter
    .post('/:groupId', join)
    .delete('/:groupId', leave)

export default groupsRouter;
