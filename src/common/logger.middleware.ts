import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import type { FastifyRequest, FastifyReply } from 'fastify';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger: Logger = new Logger('Request');
  private readonly passUrl: string[] = ['/health'];

  public use(req: FastifyRequest, _res: FastifyReply, next: () => void): void {
    if (this.passUrl.includes(req.originalUrl)) {
      next();
      return;
    }

    this.logger.log(`${req.method} ${req.originalUrl} - ${req.ip.replace('::ffff:', '')}`);
    next();
  }
}
