import { PrismaClientOptions } from '@prisma/client/runtime/library';

export const config = {
  env: 'development',

  prismaOptions: {
    log: ['query', 'info', 'warn', 'error'],
  } satisfies PrismaClientOptions,
};
