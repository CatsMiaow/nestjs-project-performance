import type { MySqlDriver } from '@mikro-orm/mysql';
import type { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { type PoolOptions } from 'mysql2';

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
      idleTimeoutMillis: 30000,
    },
    driverOptions: {
      pool: {
        // connectTimeout: 10000,
      } satisfies PoolOptions,
    },
  } satisfies MikroOrmModuleOptions<MySqlDriver>,
};
