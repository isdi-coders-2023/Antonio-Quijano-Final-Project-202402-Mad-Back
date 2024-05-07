import { type UserController } from '../controllers/users.controllers';
import { type AuthInterceptor } from '../middleware/auth.interceptor';
import { UserRouter } from './users.routers';

describe('Given a instance of the class UsersRouter', () => {
  const controller = {
    login: jest.fn(),
    getAll: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  } as unknown as UserController;
  const authInterceptor = {
    authentication: jest.fn(),
  } as unknown as AuthInterceptor;

  const router = new UserRouter(controller, authInterceptor);
  test('Then it should be instance of the class', () => {
    expect(router).toBeInstanceOf(UserRouter);
  });
});
