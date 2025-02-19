import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { SampleController } from './sample.controller';
import { SampleService } from './sample.service';
import { Category, Memo } from '../entities/test';

@Module({
  imports: [MikroOrmModule.forFeature([Memo, Category])],
  controllers: [SampleController],
  providers: [SampleService],
})
export class SampleModule {}
