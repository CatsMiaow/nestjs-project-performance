import { Test, TestingModule } from '@nestjs/testing';

import { CommonModule } from '../common/common.module';
import { SampleController } from './sample.controller';
import { SampleModule } from './sample.module';

let app: TestingModule;
let sample: SampleController;
let idx: number;

beforeAll(async () => {
  app = await Test.createTestingModule({
    imports: [CommonModule, SampleModule],
  }).compile();
  sample = app.get(SampleController);
});

test('create memo', async () => {
  const result = await sample.create({ title: 'FooBar', content: 'Hello World' });
  expect(result).toHaveProperty('id');
  idx = result.id;
});

test('read memo', async () => {
  expect(await sample.read(idx)).toHaveProperty('id', idx);
});

test('update memo', async () => {
  expect(await sample.update(idx, { title: 'Blahblahblah' })).toHaveProperty('success', true);
});

test('delete memo', async () => {
  expect(await sample.remove(idx)).toHaveProperty('success', true);
});

afterAll(async () => {
  await app?.close();
});
