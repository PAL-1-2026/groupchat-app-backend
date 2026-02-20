import express from "express";
import {getByUsername} from "@/apps/users/users.handler.ts";

const usersRouter = express.Router();

usersRouter
    .get('/:username', getByUsername)

export default usersRouter;
