import { FastifyAdapter, type NestFastifyApplication } from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';
import supertest from 'supertest';
import { afterAll, beforeAll, expect, test } from 'vitest';

import { AppModule } from '../../src/app.module.js';

let app: NestFastifyApplication | undefined;
let request: supertest.Agent;
let token: string;

beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleRef.createNestApplication<NestFastifyApplication>(new FastifyAdapter());
  await app.init();
  await app.getHttpAdapter().getInstance().ready();

  request = supertest.agent(app.getHttpServer());
});

test('POST: /auth/login', async () => {
  const res = await request.post('/auth/login').send({ username: 'foobar', password: 'crypto' });

  expect([200, 201]).toContain(res.status);
  expect(res.body).toHaveProperty('access_token');
  token = String(res.body.access_token);
});

test('GET: /auth/check', async () => {
  const res = await request.get('/auth/check').set('Authorization', `Bearer ${token}`).expect(200);

  expect(res.body).toHaveProperty('name', 'foobar');
});

afterAll(async () => {
  await app?.close();
});
