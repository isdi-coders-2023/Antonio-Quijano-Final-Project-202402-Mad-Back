import { type Album } from './album';

export type Purchase = {
  id: string;
  userId: string;
  date: Date;
  isPaid: boolean;
  albums: Album[];
  totalPrice: string;
};

export type PurchaseCreateDto = {
  userId: string;
  date: Date;
  isPaid: boolean;
  totalPrice: string;
};
