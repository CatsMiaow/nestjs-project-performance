import { Controller, Body, Get, Param, Post, Put, Delete,
  NotFoundException, InternalServerErrorException, ParseIntPipe } from '@nestjs/common';
import { Memo } from '@prisma/client';

import { Logger } from '../common';
import { SampleDto } from './sample.dto';
import { SampleService } from './sample.service';

@Controller('sample')
export class SampleController {
  constructor(private sample: SampleService, private logger: Logger) {
    this.logger.setContext(SampleController.name);
  }

  @Get('memo/:id')
  public async read(@Param('id', ParseIntPipe) id: number): Promise<Memo> {
    this.logger.log('read');

    const result = await this.sample.read(id);
    if (!result) {
      throw new NotFoundException('NotFoundMemo');
    }

    return result;
  }

  @Post('memo')
  public async create(@Body() body: SampleDto): Promise<{ id: number }> {
    this.logger.log('create');

    const result = await this.sample.create(body);
    if (!result.id) {
      throw new InternalServerErrorException('NotCreatedMemo');
    }

    return { id: result.id };
  }

  @Put('memo/:id')
  public async update(@Param('id', ParseIntPipe) id: number, @Body() body: SampleDto): Promise<{ success: boolean }> {
    this.logger.log('update');

    const result = await this.sample.update(id, body);

    return { success: !!result.id };
  }

  @Delete('memo/:id')
  public async remove(@Param('id', ParseIntPipe) id: number): Promise<{ success: boolean }> {
    this.logger.log('remove');

    const result = await this.sample.remove(id);

    return { success: !!result.id };
  }
}
