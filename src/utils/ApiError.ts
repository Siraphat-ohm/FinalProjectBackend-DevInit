import { HttpStatus } from './HttpStatusCode';
import BaseError from './BaseError';

export class ApiError extends BaseError {
    constructor (
        name: string,
        httpCode = HttpStatus.INTERNAL_SERVER_ERROR,
        description = "Internal Server Error"
    ) {
        super( name, httpCode, description );
    }
}