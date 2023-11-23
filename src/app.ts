import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Logger as PinoLogger, LoggerErrorInterceptor } from 'nestjs-pino';

import { middleware } from './app.middleware';
import { AppModule } from './app.module';
import { genReqId } from './config';

async function bootstrap(): Promise<string> {
  const isProduction = process.env.NODE_ENV === 'production';

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      trustProxy: isProduction,
      // Fastify has pino built in, but it use nestjs-pino, so we disable the logger.
      logger: false,
      // https://github.com/iamolegga/nestjs-pino/issues/1351
      genReqId,
    }),
    {
      bufferLogs: isProduction,
    },
  );

  app.useLogger(app.get(PinoLogger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());

  // Fastify Middleware
  await middleware(app);

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
