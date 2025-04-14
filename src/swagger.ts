import { Logger as NestLogger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module.js';
import metadata from './metadata.js';

/**
 * https://docs.nestjs.com/recipes/swagger
 */
async function bootstrap(): Promise<string> {
  const app = await NestFactory.create(AppModule, new FastifyAdapter({}));

  const options = new DocumentBuilder()
    .setTitle('OpenAPI Documentation')
    .setDescription('The sample API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  await SwaggerModule.loadPluginMetadata(metadata);
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 8000);

  return app.getUrl();
}

try {
  const url = await bootstrap();
  NestLogger.log(url, 'Bootstrap');
} catch (error) {
  NestLogger.error(error, 'Bootstrap');
}
