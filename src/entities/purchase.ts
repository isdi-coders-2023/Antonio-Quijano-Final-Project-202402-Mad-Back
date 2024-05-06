export type Purchase = {
  id: string;
  userId: string;
  date: Date;
  isPaid: boolean;
  albums: Album[];
  totalPrice: string;
};
