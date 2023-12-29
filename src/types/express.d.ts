import { UserPayload } from 'src/model/user';
declare global {
  namespace Express {
    export interface Request {
      payload: UserPayload;
    }
  }
}