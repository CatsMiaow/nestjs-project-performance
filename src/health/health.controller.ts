import { MikroORM } from '@mikro-orm/core';
import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, type HealthCheckResult, type HealthIndicatorResult } from '@nestjs/terminus';

/**
 * https://docs.nestjs.com/recipes/terminus
 */
@Controller()
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private orm: MikroORM,
  ) {}

  @Get('health')
  @HealthCheck()
  public async check(): Promise<HealthCheckResult> {
    return this.health.check([
      async (): Promise<HealthIndicatorResult> => {
        const result = await this.orm.checkConnection();
        return result.ok ? { database: { status: 'up' } } : { database: { status: 'down', message: result.reason } };
      },
    ]);
  }
}
