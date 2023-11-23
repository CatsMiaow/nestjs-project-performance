import { Injectable, NestMiddleware } from '@nestjs/common';
import type { FastifyRequest, FastifyReply } from 'fastify';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class LoggerContextMiddleware implements NestMiddleware {
  constructor(private readonly logger: PinoLogger) {}

  public use(req: FastifyRequest, _res: FastifyReply, next: () => void): void {
    req.customProps = {};
    this.logger.assign(req.customProps);

    next();
  }
}
