import express, { type Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import createDebug from 'debug';
import { UserController } from './controllers/users.controllers.js';
import { UserRouter } from './routers/users.routers.js';
import { ErrorsMiddleware } from './middleware/errors.middlewares.js';
import { type PrismaClient } from '@prisma/client';
import { UserSqlRepository } from './repositories/users.repo.js';
import { AuthInterceptor } from './middleware/auth.interceptor.js';
/* Aimport { FilesController } from './controllers/files.controller.js';
import { FilesRouter } from './routers/files.router.js';
import { FilesInterceptor } from './middleware/files.interceptor.js'; */

const debug = createDebug('MANTRA');
export const createApp = () => {
  debug('Creating app');
  return express();
};

export const startApp = (app: Express, prisma: PrismaClient) => {
  debug('Starting app');
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(cors());
  app.use(express.static('public'));

  const authInterceptor = new AuthInterceptor();
  /* Const filesInterceptor = new FilesInterceptor(); */

  // Prev const articlesRepo = new ArticlesFsRepo();
  /* const articlesRepo = new ArticlesSqlRepo(prisma);
  const articlesController = new ArticlesController(articlesRepo);
  const articlesRouter = new ArticlesRouter(
    articlesController,
    authInterceptor,
    articlesRepo
  );
  app.use('/articles', articlesRouter.router); */

  const usersRepo = new UserSqlRepository(prisma);
  const usersController = new UserController(usersRepo);
  const usersRouter = new UserRouter(usersController, authInterceptor);
  app.use('/users', usersRouter.router);

  /* Const filesController = new FilesController();
  const filesRouter = new FilesRouter(filesController, filesInterceptor);

  app.use('/files', filesRouter.router); */
  const errorsMiddleware = new ErrorsMiddleware();
  app.use(errorsMiddleware.handle.bind(errorsMiddleware));
};
