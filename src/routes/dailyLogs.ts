import { Request, Response, NextFunction, Router } from 'express';
import { HttpStatus } from '../utils/HttpStatusCode';
import prisma from '../utils/prisma';
import { generateId } from '../utils/generateId';

const router = Router();

router.post('/', async(req: Request, res: Response, next: NextFunction) => {    
    try {
        const { content, date } =  req.body;
        const userId = req.payload.id
        if ( !content || !date ) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Invalid request' });
        }
        const id = generateId();
        const log = await prisma.daily.create({ 
            data: { 
                id, 
                content, 
                date: new Date(date),
                user: {
                    connect: {
                        id: userId
                    }
                }
            }}
        );
        res.status(HttpStatus.OK).json( log );
    } catch (e) {
        next(e);
    }
});

router.get('/', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const logs = await prisma.daily.findMany({ where : { userId: req.payload?.id }});
        res.status(HttpStatus.OK).json( logs );
    } catch (e) {
        next(e);
    }
});

router.get('/:id', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const userId = req.payload!.id;
        const log = await prisma.daily.findFirstOrThrow({ where: { id , AND: { userId } } } );
        res.status(HttpStatus.OK).json( log );
    } catch (e) {
        next(e);
    }
});

router.put('/:id', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { body } = req;
        const userId = req.payload!.id;
        let date;
        const foundLog = await prisma.daily.findFirstOrThrow({ where: { id, AND: { userId } } });
        if ( body.date ) {
            date = new Date(body.date);
        } 
        const log = await prisma.daily.update({ where: { id }, data: {
            content: body.content,
            date: date || foundLog.date,
        } });
        res.status(HttpStatus.OK).json( log );
    } catch (e) {
        next(e);
    }
});

router.delete('/:id', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const userId = req.payload!.id;
        const foundLog = await prisma.daily.findFirstOrThrow({ where: { id , AND: { userId } } });
        res.status(HttpStatus.OK).json(foundLog);
    } catch (e) {
        next(e);
    }
});

export default router;