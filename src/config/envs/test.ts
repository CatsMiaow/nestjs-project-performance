import type { MySqlDriver } from '@mikro-orm/mysql';
import type { MikroOrmModuleOptions } from '@mikro-orm/nestjs';

export const config = {
  env: 'test',

  mikro: {
    debug: true,
    host: process.env['DB_HOST'] ?? '127.0.0.1',
    user: process.env['DB_USER'],
    password: process.env['DB_PASSWORD'],
  } satisfies MikroOrmModuleOptions<MySqlDriver>,
};
