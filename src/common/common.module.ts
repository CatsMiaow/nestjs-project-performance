import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { LoggerContextMiddleware } from './logger-context.middleware';

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
