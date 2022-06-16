import {Address} from './address';

export interface Reservation {
  id?: number;
  userId: number;
  carId: number;
  price?: number;
  address: Address;
  toDate: string;
  fromDate: string;
}
