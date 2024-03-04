/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { NestFastifyApplication } from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';
import supertest from 'supertest';
import { afterAll, beforeAll, expect, test } from 'vitest';

import { AppModule } from '../../src/app.module';

let app: NestFastifyApplication | undefined;
let request: supertest.Agent;
let token: string;

beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleRef.createNestApplication<NestFastifyApplication>();
  await app.init();

  request = supertest.agent(app.getHttpServer());
});

test('POST: /auth/login', async () => {
  const { status, body } = await request.post('/auth/login').send({ username: 'foobar', password: 'crypto' });

  expect([200, 201]).toContain(status);
  expect(body).toHaveProperty('access_token');
  token = body.access_token;
});

test('GET: /auth/check', async () => {
  const { body } = await request.get('/auth/check').set('Authorization', `Bearer ${token}`).expect(200);

  expect(body).toHaveProperty('name', 'foobar');
});

afterAll(async () => {
  await app?.close();
});
