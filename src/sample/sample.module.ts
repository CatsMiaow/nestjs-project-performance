import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { SampleController } from './sample.controller.js';
import { SampleService } from './sample.service.js';
import { Category, Memo } from '../entities/test/index.js';

@Module({
  imports: [MikroOrmModule.forFeature([Memo, Category])],
  controllers: [SampleController],
  providers: [SampleService],
})
export class SampleModule {}
