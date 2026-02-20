import type {Request, Response, NextFunction} from "express";
import * as userService from "@/apps/users/users.service.ts"

export async function getByUsername(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const username: string = req.params['username'] as string;
        const user = await userService.getByUsername(username);
        res.status(200).json(user);
        return;
    } catch (error: unknown) {
        return next(error);
    }
}
