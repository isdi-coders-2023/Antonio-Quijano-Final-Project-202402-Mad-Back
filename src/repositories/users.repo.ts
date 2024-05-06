/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import createDebug from 'debug';
import { HttpError } from '../middleware/errors.middlewares.js';
import { type PrismaClient } from '@prisma/client';
import { type User, type UserCreateDto } from '../entities/user.js';

const debug = createDebug('MANTRA');

const select = {
  id: true,
  name: true,
  email: true,
  role: true,
  purchaseHistory: true,
  isFavorite: true,
};

export class UserSqlRepository {
  constructor(private readonly prisma: PrismaClient) {
    debug('Instantiated user repository');
  }

  async findUser(key: string, value: unknown) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return this.prisma.user.findMany({
      where: {
        [key]: value,
      },
      select,
    });
  }

  async searchForLogin(key: 'email' | 'name', value: string) {
    if (!['email', 'name'].includes(key)) {
      throw new HttpError(404, 'Not found', 'Invalid parameters');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const userData = await this.prisma.user.findFirst({
      where: { [key]: value },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        password: true,
      },
    });

    if (!userData) {
      throw new HttpError(404, 'Not Found', `Invalid ${key} or password`);
    }

    return userData;
  }

  async readAll() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return this.prisma.user.findMany({ select });
  }

  async readById(inputId: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const user = await this.prisma.user.findUnique({
      where: { id: inputId },
      select,
    });
    if (!user) {
      throw new HttpError(404, 'Not Found', `User ${inputId} not found`);
    }

    return user;
  }

  async create(data: UserCreateDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const newUser = this.prisma.user.create({
      data: {
        ...data,
      },
      select,
    });
    return newUser;
  }

  async update(id: string, data: Partial<UserCreateDto>) {
    let user = (await this.prisma.user.findUnique({
      where: { id },
    })) as User;
    if (!user) {
      throw new HttpError(404, 'Not Found', `User ${id} not found`);
    }

    try {
      user = (await this.prisma.user.update({
        where: { id },
        data,
        select,
      })) as User;
    } catch (error) {
      throw new HttpError(404, 'Not Found', `User ${id}not found`);
    }

    return user;
  }

  async delete(inputId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: inputId },
      select,
    });
    if (!user) {
      throw new HttpError(404, 'Not Found', `User ${inputId} not found`);
    }

    return this.prisma.user.delete({ where: { id: inputId }, select });
  }
}
