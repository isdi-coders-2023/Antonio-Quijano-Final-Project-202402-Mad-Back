import { PrismaClient } from '@prisma/client';
import createDebug from 'debug';

const debug = createDebug('MANTRA');
export const dbConnect = async () => {
  debug('Connecting to database');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const prisma = new PrismaClient();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return prisma;
};
