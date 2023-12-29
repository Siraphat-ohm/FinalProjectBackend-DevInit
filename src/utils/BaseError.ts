import { HttpStatus } from './HttpStatusCode';

class BaseError extends Error { 
    public readonly name: string;
    public readonly httpCode: HttpStatus;

    constructor ( name: string, httpCode: HttpStatus, description: string ) {
        super(description);
        Object.setPrototypeOf( this, new.target.prototype );
        this.name = name;
        this.httpCode = httpCode;
        
        Error.captureStackTrace( this );
    }

}

export default BaseError;