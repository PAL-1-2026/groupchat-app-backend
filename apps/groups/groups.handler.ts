import type {NextFunction, Request, Response} from "express";
import * as groupService from "@/apps/groups/groups.service.ts"

export async function join(req: Request, res: Response, next: NextFunction): Promise<void> {
    const groupId: string = req.params['groupId'] as string;
    const userId = res.locals.users.userId;
    const result = await groupService.join(groupId, userId);
    res.status(200).json({message: "group joined successfully"});
}

export async function leave(req: Request, res: Response, next: NextFunction): Promise<void> {
    const groupId: string = req.params['groupId'] as string;
    const userId = res.locals.users.userId;
    const result = await groupService.leave(groupId, userId);
    res.status(200).json({message: "group leave successfully"});
}
