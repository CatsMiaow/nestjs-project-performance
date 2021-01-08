import { Global, Module } from '@nestjs/common';

import { Logger, PrismaService } from '.';

@Global()
@Module({
  providers: [Logger, PrismaService],
  exports: [Logger, PrismaService],
})
export class CommonModule {}
