import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import compression from 'compression';
import session from 'express-session';
import helmet from 'helmet';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const isProduction = (process.env.NODE_ENV === 'production');
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  if (isProduction) {
    app.enable('trust proxy');
  }

  //#region Express Middleware
  app.use(compression());
  app.use(session({
    secret: 'tEsTeD',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: 'auto' },
  }));
  app.use(helmet());
  //#endregion

  await app.listen(process.env.PORT || 3000);
}

// eslint-disable-next-line no-console
bootstrap().then(() => console.log('Bootstrap', new Date().toLocaleString())).catch(console.error);
