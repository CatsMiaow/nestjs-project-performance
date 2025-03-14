import compression from '@fastify/compress';
import cookie from '@fastify/cookie';
import helmet from '@fastify/helmet';
import { Authenticator } from '@fastify/passport';
import session from '@fastify/session';
import type { INestApplication } from '@nestjs/common';
import type { NestFastifyApplication } from '@nestjs/platform-fastify';

export async function middleware(app: NestFastifyApplication): Promise<INestApplication> {
  const isProduction = process.env.NODE_ENV === 'production';

  await app.register(compression);
  await app.register(cookie);
  await app.register(session, {
    // Requires 'store' setup for production
    secret: 'nEsTjS-pRoJeCt-PeRfOrMaNcE-tEsTeD',
    rolling: true,
    saveUninitialized: true,
    cookie: { secure: isProduction },
  });

  const passport = new Authenticator();
  await app.register(passport.initialize());
  await app.register(passport.secureSession());
  await app.register(helmet);

  return app;
}
