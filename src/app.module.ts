import { MiddlewareConsumer, Module, NestModule, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PrismaModule } from 'nestjs-prisma';

import { AuthModule } from './auth/auth.module';
import { ExceptionsFilter, LoggerMiddleware } from './common';
import { CommonModule } from './common/common.module';
import { configuration } from './config';
import { SampleModule } from './sample/sample.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    // Static
    ServeStaticModule.forRoot({
      rootPath: `${__dirname}/../public`,
      renderPath: '/',
    }),
    /**
     * https://docs.nestjs.com/recipes/prisma
     * https://www.prisma.io/nestjs
     * https://nestjs-prisma.dev
     */
    PrismaModule.forRootAsync({
      isGlobal: true,
      useFactory: (config: ConfigService) => ({
        prismaOptions: {
          ...config.get('prismaOptions'),
          datasources: {
            db: {
              url: config.getOrThrow('DATABASE_URL'),
            },
          },
        },
      }),
      inject: [ConfigService],
    }),
    // Global
    CommonModule,
    // Authentication
    AuthModule,
    // API Sample
    SampleModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionsFilter,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    },
  ],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
