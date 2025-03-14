import { Global, type MiddlewareConsumer, Module, type NestModule } from '@nestjs/common';

import { LoggerContextMiddleware } from './logger-context.middleware.js';

@Global()
@Module({
  providers: [],
  exports: [],
})
export class CommonModule implements NestModule {
  // Global Middleware
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerContextMiddleware).forRoutes('*');
  }
}
