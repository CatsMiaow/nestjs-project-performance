/* eslint-disable no-console */
import { Injectable, Logger as BaseLogger, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class Logger extends BaseLogger {
  public log(message: unknown): void {
    // super.log(message, this.context);
    console.log(this.prefix(), message);
  }

  public error(message: unknown, trace?: string): void {
    // super.error(message, trace, this.context);
    console.error(this.prefix(), message, '\n', trace);
  }

  private prefix(): string {
    // dayjs().format('YYYY-MM-DD HH:mm:ss');
    let prefix = new Date().toLocaleString();
    if (this.context) {
      prefix += ` [${this.context}]`;
    }

    return prefix;
  }
}
