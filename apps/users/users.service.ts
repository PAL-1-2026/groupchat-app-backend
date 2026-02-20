import type {RegisterSchema, User, UserResponse} from "@/apps/users/users.dto.ts";
import { AppError } from '@/errors/AppError';
import errorManagement from '@/errors/errorManagement';
import * as userRepository from "@/apps/users/users.repository.ts";
import {hashPassword} from "@/libraries/authenticator/bcrypt.ts";
import { v4 as uuidv4 } from 'uuid';

export async function create(userRequest: RegisterSchema): Promise<UserResponse> {
    try {
        const user: User = {
            id: uuidv4(),
            ...userRequest,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const hashedPassword = await hashPassword(userRequest.password);
        user.password = hashedPassword;

        const insertedUser = await userRepository.create(user);
        return insertedUser;
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }

        throw new AppError(errorManagement.commonErrors.InternalServerError, `unexpected error occurred while creating the user: ${error}`, false);
    }
}

export async function getByUsername(username: string): Promise<UserResponse> {
    try {
        const user = await userRepository.getByUsername(username);
        return userResponseBuilder(user);
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }

        throw new AppError(errorManagement.commonErrors.InternalServerError, `unexpected error occurred while getting the user: ${error}`, false);
    }
}

const userResponseBuilder = (userRequest: User): UserResponse => {
    return {
        id: userRequest.id,
        username: userRequest.username,
        createdAt: userRequest.createdAt,
        updatedAt: userRequest.updatedAt,
    };
};
