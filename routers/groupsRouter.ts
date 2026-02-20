import express from "express";
import {getUserGroup, join, leave} from "@/apps/groups/groups.handler.ts";

const groupsRouter = express.Router();

groupsRouter
    .get('/', getUserGroup)
    .post('/:groupId', join)
    .delete('/:groupId', leave)

export default groupsRouter;
