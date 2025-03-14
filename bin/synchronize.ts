/* eslint-disable no-console */
import { select } from '@inquirer/prompts';
import { MikroORM } from '@mikro-orm/core';
import { config as dotfig } from 'dotenv';

import { configuration } from '../src/config/index.js';

dotfig();
if (!process.env['DB_HOST']) {
  throw new Error('Create a .env file');
}

// https://mikro-orm.io/docs/schema-generator
(async () => {
  const { mikro: config } = await configuration();

  const dbName = await select({
    message: 'Please select a database name.',
    choices: [
      { value: 'test' },
      { value: 'test2' },
      // ...
    ],
  });

  const orm = await MikroORM.init({
    entities: [`${import.meta.dirname}/../src/entities/${dbName}`],
    entitiesTs: [`${import.meta.dirname}/../src/entities/${dbName}`],
    driver: config.driver,
    host: config.host,
    user: config.user,
    password: config.password,
    dbName,
    schemaGenerator: {
      createForeignKeyConstraints: false,
    },
  });
  const generator = orm.schema;

  const createDump = await generator.getCreateSchemaSQL();
  console.log(createDump);

  // DIY
  await generator.createSchema();

  await orm.close(true);
})().catch((error: unknown) => {
  console.error(error);
});
