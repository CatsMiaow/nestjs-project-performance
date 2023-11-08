import { Test, TestingModule } from '@nestjs/testing';
import { Memo } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { afterAll, beforeAll, expect, test } from 'vitest';
import { DeepMockProxy } from 'vitest-mock-extended';

import { SampleController } from './sample.controller';
import { SampleService } from './sample.service';
import { MockPrismaModule } from '../../test/mock';

let app: TestingModule | undefined;
let prisma: DeepMockProxy<PrismaService>;
let sample: SampleController;
let mockValue: Memo;

beforeAll(async () => {
  app = await Test.createTestingModule({
    imports: [MockPrismaModule],
    controllers: [SampleController],
    providers: [SampleService],
  }).compile();

  prisma = app.get(PrismaService);
  sample = app.get(SampleController);
});

test('create memo', async () => {
  mockValue = {
    id: 1,
    title: 'FooBar',
    content: 'Hello World',
    updatedAt: new Date(),
    createdAt: new Date(),
  };
  prisma.memo.create.mockResolvedValueOnce(mockValue);

  const result = await sample.create({ title: 'FooBar', content: 'Hello World' });
  expect(result).toHaveProperty('id', 1);
});

test('read memo', async () => {
  prisma.memo.findUnique.mockResolvedValueOnce(mockValue);

  expect(await sample.read(1)).toHaveProperty('id', 1);
});

test('update memo', async () => {
  mockValue.title = 'Blahblahblah';
  prisma.memo.update.mockResolvedValueOnce(mockValue);

  const result = await sample.update(1, { title: mockValue.title });
  expect(result).toHaveProperty('success', true);
});

test('delete memo', async () => {
  prisma.memo.delete.mockResolvedValueOnce(mockValue);

  const result = await sample.remove(1);
  expect(result).toHaveProperty('success', true);
});

afterAll(async () => {
  await app?.close();
});
