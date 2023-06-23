import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * https://docs.nestjs.com/recipes/prisma
 * https://www.prisma.io/nestjs
 * https://github.com/prisma/prisma/issues/2443#issuecomment-630679118
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  public async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  public enableShutdownHooks(app: INestApplication): void {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
