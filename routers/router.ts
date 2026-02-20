import express from 'express';

import authsRouter from "@/routers/authsRouter.ts";
import usersRouter from "@/routers/usersRouter.ts";
import {authMiddleware} from "@/libraries/authenticator/auth.ts";
import groupsRouter from "@/routers/groupsRouter.ts";
import messagesRouter from "@/routers/messagesRouter.ts";

const router = express.Router();

router.use('/auths', authsRouter);
router.use('/users', authMiddleware, usersRouter);
router.use('/groups', authMiddleware, groupsRouter);
router.use('/messages', authMiddleware, messagesRouter);

export default router;
