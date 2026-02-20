import express from "express";
import {login, logout, register} from '@/apps/auths/auths.handler.ts';

const authsRouter = express.Router();

authsRouter
    .post('/login', login)
    .delete('/logout', logout)
    .post('/register', register)

export default authsRouter;
