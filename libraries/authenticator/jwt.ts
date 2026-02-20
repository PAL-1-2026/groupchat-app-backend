import jwt, { type JwtPayload } from 'jsonwebtoken';

const expiry = Number(process.env.JWT_EXPIRY as string);
const secret = process.env.JWT_SECRET as string;

export function signToken(userId: string): string {
    return jwt.sign(
        { userId },
        secret,
        {
            algorithm: 'HS256',
            expiresIn: expiry,
        }
    );
}

export function verifyToken(token: string): JwtPayload {
    return jwt.verify(
        token,
        secret,
        { algorithms: ['HS256'] }
    ) as JwtPayload;
}
