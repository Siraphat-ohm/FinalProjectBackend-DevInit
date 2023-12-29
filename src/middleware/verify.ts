import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';
import { HttpStatus } from '../utils/HttpStatusCode';
import { verifyToken } from '../utils/token';
import prisma from '../utils/prisma';

const verify = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            throw new ApiError("Invalid token", HttpStatus.UNAUTHORIZED);
        }
        const decoded = verifyToken(token);
        req.payload = decoded;

        const userId = req.payload.id;
        const user = await prisma.user.findFirst({ where: { id: userId } });
        
        if (!user) {
            throw new ApiError("Invalid user", HttpStatus.UNAUTHORIZED);
        }

        next();
    } catch (e) {
        next(e);
    }
}

export default verify;