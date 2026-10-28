import { FastifyAdapter, type NestFastifyApplication } from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';
import supertest from 'supertest';
import { afterAll, beforeAll, expect, test } from 'vitest';

import { AppModule } from '../../src/app.module.js';

let app: NestFastifyApplication | undefined;
let request: supertest.Agent;
let idx: number;

beforeAll(async () => {
  const moduleFixture = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication<NestFastifyApplication>(new FastifyAdapter());
  await app.init();
  await app.getHttpAdapter().getInstance().ready();

  request = supertest.agent(app.getHttpServer());
});

test('POST: /sample/memo', async () => {
  const res = await request.post('/sample/memo').send({
    title: 'FooBar',
    content: 'Hello World',
    categories: ['foo', 'bar'],
  });

  expect([200, 201]).toContain(res.status);
  expect(res.body).toHaveProperty('id');

  idx = Number(res.body.id);
});

test('GET: /sample/memo/:idx', async () => {
  const res = await request.get(`/sample/memo/${idx}`).expect(200);

  expect(res.body).toHaveProperty('title', 'FooBar');
  expect(Array.isArray(res.body.categories)).toBe(true);
  expect(res.body.categories).toHaveLength(2);
});

test('PUT: /sample/memo/:idx', async () => {
  const res = await request
    .put(`/sample/memo/${idx}`)
    .send({ title: 'Blahblahblah', categories: ['blah'] })
    .expect(200);

  expect(res.body).toHaveProperty('title', 'Blahblahblah');
});

test('DELETE: /sample/memo/:idx', async () => {
  const res = await request.delete(`/sample/memo/${idx}`).expect(200);

  expect(res.body).toHaveProperty('result', 1);
});

afterAll(async () => {
  await app?.close();
});
