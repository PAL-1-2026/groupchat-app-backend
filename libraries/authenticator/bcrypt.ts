import bcrypt from 'bcrypt';
import { AppError } from '@/errors/AppError';
import errorManagement from '@/errors/errorManagement';

const saltRounds = Number(process.env.SALT_ROUNDS) ?? 10;

export async function hashPassword(plainText: string): Promise<string> {
    try {
        const hashedPassword = await bcrypt.hash(plainText, saltRounds);
        return hashedPassword;
    } catch (error: unknown) {
        if (error instanceof AppError) {
            throw error;
        }

        throw new AppError(errorManagement.commonErrors.InternalServerError, 'unable to hash the user password', false);
    }
};

export async function verifyPassword(plainText: string, hashedPassword: string): Promise<boolean> {
    try {
        const result = await bcrypt.compare(plainText, hashedPassword);
        return result;
    } catch (error: unknown) {
        if (error instanceof AppError) {
            throw error;
        }

        throw new AppError(errorManagement.bcryptErrors.InvalidCredentials, 'unable to verify the user credentials', true);
    }
};
