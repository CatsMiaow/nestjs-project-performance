import { PrismaClientOptions } from '@prisma/client/runtime/library';

export const config = {
  env: 'production',

  prismaOptions: {
    log: ['error'],
  } satisfies PrismaClientOptions,
};
