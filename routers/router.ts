import express from 'express';

import authsRouter from "@/routers/authsRouters.ts";
import usersRouter from "@/routers/usersRouter.ts";
import {authMiddleware} from "@/libraries/authenticator/auth.ts";

const router = express.Router();

router.use('/auths', authsRouter);
router.use('/users', authMiddleware, usersRouter);

export default router;
