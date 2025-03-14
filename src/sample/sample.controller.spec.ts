import { EntityManager, type EntityRepository } from '@mikro-orm/core';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Test, TestingModule } from '@nestjs/testing';
import { afterAll, beforeAll, expect, test } from 'vitest';
import { type DeepMockProxy, mockDeep } from 'vitest-mock-extended';

import { SampleController } from './sample.controller.js';
import { SampleService } from './sample.service.js';
import { Category, Memo } from '../entities/test/index.js';

let app: TestingModule | undefined;
let repository: DeepMockProxy<EntityRepository<Memo>>;
let sample: SampleController;
let mockValue: Memo;

beforeAll(async () => {
  app = await Test.createTestingModule({
    controllers: [SampleController],
    providers: [
      SampleService,
      {
        provide: getRepositoryToken(Memo),
        useValue: mockDeep<EntityRepository<Memo>>(),
      },
      {
        provide: getRepositoryToken(Category),
        useValue: mockDeep<EntityRepository<Category>>(),
      },
      {
        provide: EntityManager,
        useValue: mockDeep<EntityManager>(),
      },
    ],
  }).compile();

  const em: DeepMockProxy<EntityManager> = app.get(EntityManager);
  em.flush.mockResolvedValueOnce(undefined);

  repository = app.get(getRepositoryToken(Memo));
  sample = app.get(SampleController);
});

test('create memo', async () => {
  mockValue = <Memo>{
    id: 1,
    title: 'FooBar',
    content: 'Hello World',
    updatedAt: new Date(),
    createdAt: new Date(),
  };
  repository.create.mockResolvedValueOnce(mockValue);

  const result = await sample.create({ title: 'FooBar', content: 'Hello World' });
  expect(result).toHaveProperty('id', 1);
});

test('read memo', async () => {
  repository.findOne.mockResolvedValueOnce(mockValue);

  expect(await sample.read(1)).toHaveProperty('id', 1);
});

test('update memo', async () => {
  mockValue.title = 'Blahblahblah';
  repository.findOneOrFail.mockResolvedValueOnce(mockValue);

  const result = await sample.update(1, { title: mockValue.title });
  expect(result).toHaveProperty('title', mockValue.title);
});

test('delete memo', async () => {
  repository.nativeDelete.mockResolvedValueOnce(1);

  const result = await sample.remove(1);
  expect(result).toHaveProperty('result', 1);
});

afterAll(async () => {
  await app?.close();
});
