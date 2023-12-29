import { Request, Response, NextFunction } from "express"
import { ApiError } from "../utils/ApiError"
import { HttpStatus } from "../utils/HttpStatusCode";

const errorHander = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
        return next(err)
    }

    if ( err instanceof ApiError ) {
       res.status(err.httpCode).json({ error: err.name });
       return;
    }

    console.log(err);

    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
}

export default errorHander;