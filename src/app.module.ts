import { MiddlewareConsumer, Module, NestModule, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';

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
    // Global
    CommonModule,
    // Authentication
    AuthModule,
    // API Sample
    SampleModule,
  ],
  providers: [{
    provide: APP_FILTER,
    useClass: ExceptionsFilter,
  }, {
    provide: APP_PIPE,
    useValue: new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  }],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
