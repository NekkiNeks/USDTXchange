import { role } from '@prisma/client';
import userType from './userType';

export default interface iJwtPayload {
  id: string;
  username: string;
  type: userType;
  role: role | null;
}
