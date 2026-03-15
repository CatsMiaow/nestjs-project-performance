import { ReflectMetadataProvider } from '@mikro-orm/decorators/legacy';
import { MySqlDriver } from '@mikro-orm/mysql';
import type { MikroOrmModuleOptions } from '@mikro-orm/nestjs';

export const config = {
  mikro: {
    driver: MySqlDriver,
    metadataProvider: ReflectMetadataProvider,
    // entities: [`${import.meta.dirname}/../../entities`],
    // entitiesTs: [`${import.meta.dirname}/../../entities`],
    autoLoadEntities: true,
    dbName: 'test',
    // timezone: '+09:00',
    // forceUtcTimezone: false,
    allowGlobalContext: true,
  } satisfies MikroOrmModuleOptions<MySqlDriver>,

  hello: 'world',
  jwtSecret: process.env.JWT_SECRET,
};
