import { Request, Response, NextFunction, Router } from "express";
import prisma from "../utils/prisma";
import { HttpStatus } from "../utils/HttpStatusCode";
import { generateId } from "../utils/generateId";

const router = Router();

router.post('/', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, description, dueDate, priority, status } = req.body;
        const userId = req.payload!.id;
        if ( !title || !description || !dueDate || !priority || !status ) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Invalid request' });
        }
        if ( status !== 'TODO' && status !== 'DOING' && status !== 'DONE' ) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Invalid status' });
        }
        const id = generateId();
        const todo = await prisma.todo.create({ 
            data: { 
                id,
                title, 
                description, 
                dueDate: new Date(dueDate), 
                priority, 
                status,
                user: {
                    connect: {
                        id: userId
                    }
                }
            }
        });

        res.status(HttpStatus.OK).json(todo);
    } catch (e) {
        next(e);
    }
});

router.get('/', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.payload!.id;
        const todos = await prisma.todo.findMany({ where: { userId } });
        res.status(HttpStatus.OK).json(todos);
    } catch (e) {
        next(e);
    }
});

router.get('/:id', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.payload!.id;
        const { id } = req.params;
        const todo = await prisma.todo.findFirst({ where: { id, userId } });
        if ( !todo ) {
            return res.status(HttpStatus.NOT_FOUND).json({ message: 'Todo not found' });
        }
        res.status(HttpStatus.OK).json(todo);
    } catch (e) {
        next(e);
    }
});

router.put('/:id', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.payload!.id;
        const { id } = req.params;
        const { title, description, dueDate, priority, status } = req.body;
        if ( ( status !== 'TODO' && status !== 'DOING' && status !== 'DONE' ) && !!status ) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Invalid status' });
        }
        const todo = await prisma.todo.findFirst({ where: { id, userId } });
        if ( !todo ) {
            return res.status(HttpStatus.NOT_FOUND).json({ message: 'Todo not found' });
        }
        const updatedTodo = await prisma.todo.update({ 
            where: { id }, 
            data: { 
                title, 
                description, 
                dueDate: !!dueDate ? new Date(dueDate) : todo.dueDate, 
                priority, 
                status : !!status ? status : todo.status
            } 
        });
        res.status(HttpStatus.OK).json(updatedTodo);
    } catch (e) {
        next(e);
    }
});

router.delete('/:id', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.payload!.id;
        const { id } = req.params;
        const todo = await prisma.todo.findFirst({ where: { id, userId } });
        if ( !todo ) {
            return res.status(HttpStatus.NOT_FOUND).json({ message: 'Todo not found' });
        }
        const deletedTodo = await prisma.todo.delete({ where: { id } });
        res.status(HttpStatus.OK).json(deletedTodo);
    } catch (e) {
        next(e);
    }
});

export default router;