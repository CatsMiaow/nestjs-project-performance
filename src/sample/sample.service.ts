import { Injectable } from '@nestjs/common';
import type { Prisma, Memo } from '@prisma/client';

import { PrismaService } from '../common';

/**
 * https://www.prisma.io/docs/concepts/components/prisma-client/crud
 */
@Injectable()
export class SampleService {
  constructor(private prisma: PrismaService) {}

  public async create(data: Prisma.MemoCreateInput): Promise<Memo> {
    return this.prisma.memo.create({ data });
  }

  public async read(id: number): Promise<Memo | null> {
    return this.prisma.memo.findUnique({ where: { id } });
  }

  public async update(id: number, data: Prisma.MemoUpdateInput): Promise<Memo> {
    return this.prisma.memo.update({ data, where: { id } });
  }

  public async remove(id: number): Promise<Memo> {
    return this.prisma.memo.delete({ where: { id } });
  }
}
