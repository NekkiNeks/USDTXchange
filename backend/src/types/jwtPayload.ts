import { role } from '@prisma/client';
import userType from './userType';

export default interface iJwtPayload {
  userId: string;
  username: string;
  type: userType;
  role: role | null;
}
