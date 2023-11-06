import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import compression from 'compression';
import session from 'express-session';
import helmet from 'helmet';

import { AppModule } from './app.module';

async function bootstrap(): Promise<string> {
  const isProduction = process.env.NODE_ENV === 'production';
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  if (isProduction) {
    app.enable('trust proxy');
  }

  //#region Express Middleware
  app.use(compression());
  app.use(
    session({
      secret: 'tEsTeD',
      resave: false,
      saveUninitialized: true,
      cookie: { secure: 'auto' },
    }),
  );
  app.use(helmet());
  //#endregion

  app.enableShutdownHooks();
  await app.listen(process.env.PORT || 3000);

  return app.getUrl();
}

void (async () => {
  try {
    const url = await bootstrap();
    Logger.log(url, 'Bootstrap');
  } catch (error) {
    Logger.error(error, 'Bootstrap');
  }
})();
