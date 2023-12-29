import { Request, Response, NextFunction, Router } from "express";
import { HttpStatus } from "../utils/HttpStatusCode";
import prisma from "../utils/prisma";
import { generateId } from "../utils/generateId";

const router = Router();

router.post('/', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, description, startDate, endDate } = req.body;
        const userId = req.payload!.id;
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
        if ( !title || !description || !startDate || !endDate ) {
            return  res.status(HttpStatus.BAD_REQUEST).json({ message: 'Invalid request' });
        }
        if ( startDateObj > endDateObj ) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Invalid date' });
        }
        const id = generateId();
        const event = await prisma.calendarEvent.create({
            data: {
                id,
                title,
                description,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                user: {
                    connect: {
                        id: userId
                    }
                }
            }
        });

        return res.status(HttpStatus.OK).json(event);
    } catch (e) {
        next(e);
    }
});

router.get('/', async(req: Request, res: Response, next: NextFunction) => { 
    try {
        const userId = req.payload!.id;
        const events = await prisma.calendarEvent.findMany({ where: { userId } });
        return res.status(HttpStatus.OK).json(events);
    } catch (e) {
        next(e);
    }
});

router.get('/:id', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const userId = req.payload!.id;
        const event = await prisma.calendarEvent.findUniqueOrThrow({ where: { id, userId } });
        return res.status(HttpStatus.OK).json(event);
    } catch (e) {
        next(e);
    }
});

router.put('/:id', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { title, description, startDate, endDate } = req.body;
        const userId = req.payload!.id;
        const foundEvent = await prisma.calendarEvent.findUniqueOrThrow({ where: { id, userId } });
        const event = await prisma.calendarEvent.update({
            where: { id },
            data: {
                title,
                description,
                startDate: !!startDate ? new Date(startDate) : foundEvent!.startDate,
                endDate: !!endDate ? new Date(endDate) : foundEvent!.endDate
            }
        });
        return res.status(HttpStatus.OK).json(event);
    } catch (e) {
        next(e);
    }
});

router.delete('/:id', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const userId =  req.payload!.id;
        const event = await prisma.calendarEvent.findUniqueOrThrow({ where: { id, userId } });
        await prisma.calendarEvent.delete({
            where: { id }
        });
        return res.status(HttpStatus.OK).json(event);
    } catch (e) {
        next(e);
    }
}); 

export default router;