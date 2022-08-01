import { ObjectId } from 'mongoose';

export interface JwtPayload {
  id: string;
  userName: string;
}
