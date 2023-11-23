import type { User } from '../src/user';

export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      PORT: string;

      DATABASE_URL: string;
      JWT_SECRET: string;
    }
  }
}

declare module 'fastify' {
  interface FastifyRequest {
    user: User;
    // customProps of pino-http
    customProps: object;
  }
}
