type Purchase = {
  id: string;
  userId: string;
  date: string;
  isPaid: boolean;
  albums: Album[];
  totalPrice: string;
};
