import type {NextFunction, Request, Response} from "express";
import {LoginRequest, type LoginSchema} from "@/apps/auths/auths.dto.ts";
import * as authService from "@/apps/auths/auths.service.ts";
import * as userService from "@/apps/users/users.service.ts";
import {RegisterRequest, type RegisterSchema} from "@/apps/users/users.dto.ts";

export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const expiry = Number(process.env.JWT_EXPIRY as string);

        const loginRequest: LoginSchema = LoginRequest.parse(req.body);
        const response = await authService.authenticate(loginRequest);

        res.cookie('token', response.jwt, {
            maxAge: expiry * 1000,
            httpOnly: true,
            secure: false,
        });

        res.status(200).json({
            message: 'login successfully',
        });
    } catch (error: unknown) {
        return next(error);
    }
}

export async function logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: false,
        });

        res.status(200).json({
            message: 'logout successfully',
        });
    } catch (error: unknown) {
        return next(error);
    }
}

export async function register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const userRequest: RegisterSchema = RegisterRequest.parse(req.body);
        const user = await userService.create(userRequest);
        res.status(201).json(user);
    } catch (error) {
        return next(error);
    }
}
