import { Injectable, type NestMiddleware } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import type { IncomingMessage, ServerResponse } from 'node:http';

@Injectable()
export class LoggerContextMiddleware implements NestMiddleware {
  constructor(private readonly logger: PinoLogger) {}

  public use(req: IncomingMessage, _res: ServerResponse, next: () => void): void {
    req.customProps = {};
    this.logger.assign(req.customProps);

    next();
  }
}
