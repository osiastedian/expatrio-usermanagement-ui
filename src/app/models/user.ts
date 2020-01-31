import { UserRole } from './user-role.enum';

export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  userName: string;
  role: UserRole;
  password?: string;
}
