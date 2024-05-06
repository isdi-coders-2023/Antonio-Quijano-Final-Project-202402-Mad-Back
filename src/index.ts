import { createServer } from 'http';
import createDebug from 'debug';
import 'dotenv/config';
import { createApp, startApp } from './app.js';
import { dbConnect } from './tools/db.connect.js';

const debug = createDebug('MANTRA');
debug('Starting server');

const port = process.env.PORT ?? 3000;

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const app = createApp();
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
const server = createServer(app);

dbConnect()
  .then((prisma) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    startApp(app, prisma);
    server.listen(port);
  })
  .catch((error) => {
    server.emit('error', error);
  });

server.on('error', (error) => {
  debug('Error:', error);
  process.exit(1);
});

server.on('listening', () => {
  console.log(`Server Express is running http://localhost:${port}`);
});
