import type { MySqlDriver } from '@mikro-orm/mysql';
import type { MikroOrmModuleOptions } from '@mikro-orm/nestjs';

export const config = {
  env: 'production',

  mikro: {
    host: process.env['DB_HOST'] ?? '127.0.0.1',
    user: process.env['DB_USER'],
    password: process.env['DB_PASSWORD'],
    replicas: [
      {
        name: 'read',
        host: process.env['DB_HOST'] ?? '127.0.0.1',
        user: process.env['DB_USER'],
        password: process.env['DB_PASSWORD'],
      },
    ],
    pool: {
      min: 0,
      max: 30,
      idleTimeoutMillis: 10000,
      acquireTimeoutMillis: 10000,
      destroyTimeoutMillis: 60000,
    },
  } satisfies MikroOrmModuleOptions<MySqlDriver>,
};
