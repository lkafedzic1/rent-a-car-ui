import {Address} from './address';
import {Role} from './role';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  address: Address;
  role: Role;
  email: string;
  phone: string;
}
