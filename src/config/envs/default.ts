import { MySqlDriver } from '@mikro-orm/mysql';
import type { MikroOrmModuleOptions } from '@mikro-orm/nestjs';

export const config = {
  mikro: {
    driver: MySqlDriver,
    // entities: [`${__dirname}/../../entities`],
    // entitiesTs: [`${__dirname}/../../entities`],
    autoLoadEntities: true,
    dbName: 'test',
    // timezone: '+09:00',
    allowGlobalContext: true,
  } satisfies MikroOrmModuleOptions<MySqlDriver>,

  hello: 'world',
  jwtSecret: process.env.JWT_SECRET,
};
