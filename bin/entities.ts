/* eslint-disable import/no-extraneous-dependencies, no-console */
import { select } from '@inquirer/prompts';
import { MikroORM } from '@mikro-orm/core';
import { EntityGenerator } from '@mikro-orm/entity-generator';
import { config as dotfig } from 'dotenv';
import { readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { configuration } from '../src/config';

dotfig();
if (!process.env['DB_HOST']) {
  throw new Error('Create a .env file');
}

function pascalToHyphen(fileName: string): string {
  return fileName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

// https://mikro-orm.io/docs/entity-generator
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
    discovery: {
      warnWhenNoEntities: false,
    },
    extensions: [EntityGenerator],
    driver: config.driver,
    host: config.host,
    user: config.user,
    password: config.password,
    dbName,
  });

  await orm.entityGenerator.generate({
    // bidirectionalRelations: true,
    // identifiedReferences: true,
    save: true,
    path: `${__dirname}/../src/entities/${dbName}`,
    fileName: (className: string) => {
      return pascalToHyphen(className);
    },
  });
  await orm.close(true);

  const entityDir = join(__dirname, '../src/entities', dbName);
  const files = [];

  for (const file of readdirSync(entityDir)) {
    if (file === 'index.ts') {
      continue;
    }
    files.push(`export * from './${file.replace('.ts', '')}';`);
  }
  files.push('');
  // export entities db tables
  // AS-IS import { Tablename } from './entities/dbname/tablename';
  // TO-BE import { Tablename } from './entities/dbname';
  writeFileSync(join(entityDir, 'index.ts'), files.join('\n'));

  console.log(`> '${dbName}' database entities has been created: ${entityDir}`);
})().catch((error: unknown) => {
  console.error(error);
});
