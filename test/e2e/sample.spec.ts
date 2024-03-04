/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { NestFastifyApplication } from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';
import supertest from 'supertest';
import { afterAll, beforeAll, expect, test } from 'vitest';

import { AppModule } from '../../src/app.module';

let app: NestFastifyApplication | undefined;
let request: supertest.Agent;
let idx: number;

beforeAll(async () => {
  const moduleFixture = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication<NestFastifyApplication>();
  await app.init();

  request = supertest.agent(app.getHttpServer());
});

test('POST: /sample/memo', async () => {
  const { status, body } = await request.post('/sample/memo').send({ title: 'FooBar', content: 'Hello World' });

  expect([200, 201]).toContain(status);
  expect(body).toHaveProperty('id');

  idx = body.id;
});

test('GET: /sample/memo/:idx', async () => {
  const { body } = await request.get(`/sample/memo/${idx}`).expect(200);

  expect(body).toHaveProperty('title', 'FooBar');
});

test('PUT: /sample/memo/:idx', async () => {
  const { body } = await request.put(`/sample/memo/${idx}`).send({ title: 'Blahblahblah' }).expect(200);

  expect(body).toHaveProperty('success', true);
});

test('DELETE: /sample/memo/:idx', async () => {
  const { body } = await request.delete(`/sample/memo/${idx}`).expect(200);

  expect(body).toHaveProperty('success', true);
});

afterAll(async () => {
  await app?.close();
});
