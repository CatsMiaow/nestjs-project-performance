import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import type { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger: Logger = new Logger('Request');
  private readonly passUrl: string[] = ['/health'];

  public use(req: Request, _res: Response, next: () => void): void {
    if (this.passUrl.includes(req.originalUrl)) {
      return next();
    }

    this.logger.log(`${req.method} ${req.originalUrl} - ${req.ip.replace('::ffff:', '')}`);

    return next();
  }
}
