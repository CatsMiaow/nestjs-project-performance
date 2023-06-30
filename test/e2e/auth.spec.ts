import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import supertest, { SuperTest, Test as AgentTest } from 'supertest';
import { afterAll, beforeAll, expect, test } from 'vitest';

import { AppModule } from '../../src/app.module';

let app: INestApplication | undefined;
let request: SuperTest<AgentTest>;
let token: string;

beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleRef.createNestApplication();
  await app.init();

  request = supertest.agent(app.getHttpServer());
});

test('POST: /auth/login', async () => {
  const { status, body } = await request.post('/auth/login')
    .send({ username: 'foobar', password: 'crypto' });

  expect([200, 201]).toContain(status);
  expect(body).toHaveProperty('access_token');
  token = body.access_token;
});

test('GET: /auth/check', async () => {
  const { body } = await request.get('/auth/check')
    .set('Authorization', `Bearer ${token}`)
    .expect(200);

  expect(body).toHaveProperty('username', 'foobar');
});

afterAll(async () => {
  await app?.close();
});
