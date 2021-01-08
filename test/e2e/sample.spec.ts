import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from '../../src/app.module';

let app: INestApplication;
let httpServer: unknown;
let idx: number;

beforeAll(async () => {
  const moduleFixture = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();

  httpServer = app.getHttpServer();
});

test('POST: /sample/memo', async () => {
  const { status, body } = await request(httpServer)
    .post('/sample/memo')
    .send({ title: 'FooBar', content: 'Hello World' });

  expect([200, 201]).toContain(status);
  expect(body).toHaveProperty('id');

  idx = body.id;
});

test('GET: /sample/memo/:idx', async () => {
  const { body } = await request(httpServer)
    .get(`/sample/memo/${idx}`)
    .expect(200);

  expect(body).toHaveProperty('title', 'FooBar');
});

test('PUT: /sample/memo/:idx', async () => {
  const { body } = await request(httpServer)
    .put(`/sample/memo/${idx}`)
    .send({ title: 'Blahblahblah' })
    .expect(200);

  expect(body).toHaveProperty('success', true);
});

test('DELETE: /sample/memo/:idx', async () => {
  const { body } = await request(httpServer)
    .delete(`/sample/memo/${idx}`)
    .expect(200);

  expect(body).toHaveProperty('success', true);
});

afterAll(async () => {
  await app?.close();
});
