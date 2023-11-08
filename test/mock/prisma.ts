import { DynamicModule } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaModule, PrismaService } from 'nestjs-prisma';
import { mockDeep } from 'vitest-mock-extended';

export const MockPrismaModule: DynamicModule = {
  global: true,
  module: PrismaModule,
  providers: [
    {
      provide: PrismaService,
      useValue: mockDeep<PrismaClient>(),
    },
  ],
};
