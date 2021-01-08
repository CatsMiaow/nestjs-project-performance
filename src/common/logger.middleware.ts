import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import type { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly passUrl: string[] = ['/health'];

  constructor(private logger: Logger) {}

  public use(req: Request, res: Response, next: () => void): void {
    if (this.passUrl.includes(req.originalUrl)) {
      return next();
    }

    this.logger.log(`${req.method} ${req.originalUrl} - ${req.ip.replace('::ffff:', '')}`);

    return next();
  }
}
