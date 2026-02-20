import type {LoginResponse, LoginSchema} from "@/apps/auths/auths.dto.ts";
import * as userRepository from "@/apps/users/users.repository.ts";
import {verifyPassword} from "@/libraries/authenticator/bcrypt.ts";
import {AppError} from "@/errors/AppError.ts";
import errorManagement from "@/errors/errorManagement.ts";
import {signToken} from "@/libraries/authenticator/jwt.ts";

export async function authenticate(loginRequest: LoginSchema): Promise<LoginResponse> {
    const user = await userRepository.getByUsername(loginRequest.username);

    const verifyStatus = await verifyPassword(loginRequest.password, user.password);
    if (!verifyStatus) {
        throw new AppError(errorManagement.bcryptErrors.InvalidCredentials, 'invalid credentials', true);
    }

    const token = signToken(user.id);

    const loginResponse: LoginResponse = {
        jwt: token
    }

    return loginResponse;
}
