import { type Album } from './album';
import { type Purchase } from './purchase';

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  purchaseHistory: Purchase[];
  isFavorite: Album[];
};

export type UserCreateDto = {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
};

export type UserUpdateDto = {
  name?: string;
  email?: string;
  password?: string;
};
