import { Router, Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';
import { HttpStatus } from '../utils/HttpStatusCode';
import { hash, compare } from '../utils/hash';
import prisma from '../utils/prisma';
import { generateAccessToken } from '../utils/token';
import { generateId } from '../utils/generateId';

const router = Router();

router.post('/register', async(req: Request, res: Response, next: NextFunction) => {
    try {

        const { username, password, email } = req.body;
        if ( !username || !password || !email ) {
            throw new ApiError('Missing credentials', HttpStatus.BAD_REQUEST);
        }
        if ( password.length < 8 ) {
            throw new ApiError('Password must be at least 8 characters long', HttpStatus.BAD_REQUEST);
        }
        const foundUser = await prisma.user.findFirst({ where: { username } });
        if ( foundUser ) {
            throw new ApiError('Username already exists', HttpStatus.BAD_REQUEST);
        }

        const id = generateId();

        const accessToken = generateAccessToken({ username, email, id })
        const newUser = await prisma.user.create({
            data: {
                id,
                username,
                password: hash(password),
                email
            }
        });
        res.status(HttpStatus.CREATED).json({ accessToken, newUser });

    } catch (e) {
        next(e);
    }
});

router.post('/login', async(req: Request, res: Response, next: NextFunction) => {
    try {

        const { username, password } = req.body;
        if ( !username || !password ) {
            throw new ApiError('Missing credentials', HttpStatus.BAD_REQUEST);
        }
        const foundUser = await prisma.user.findFirst({ where: { username } });
        if ( !foundUser ) {
            throw new ApiError('Username not found', HttpStatus.BAD_REQUEST);
        }
        if ( !compare(password, foundUser.password) ) {
            throw new ApiError('Incorrect password', HttpStatus.BAD_REQUEST);
        }
        const userInfo = {
            username: foundUser.username,
            email: foundUser.email,
            id: foundUser.id
        };

        await prisma.user.update({
            where: { username },
            data: {
                lastLogin: new Date()
            }
        });

        const accessToken = generateAccessToken({ username, email: foundUser.email, id: foundUser.id });
        res.status(HttpStatus.OK).json({ accessToken, userInfo });

    } catch (e) {
        next(e);
    }
});

export default router;