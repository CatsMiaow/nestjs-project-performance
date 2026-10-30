# nestjs-project-performance

Node.js framework NestJS project for performance

If you focus on the performance or features of the module, you can consider using another module as an alternative in NestJS. \
In this example, the changed modules are as follows.

- [Fastify](https://docs.nestjs.com/techniques/performance) instead of `Express`
- [MikroORM](https://docs.nestjs.com/recipes/mikroorm) with [@mikro-orm/nestjs](https://mikro-orm.io/docs/usage-with-nestjs) instead of `TypeORM`
- [SWC](https://docs.nestjs.com/recipes/swc) instead of `TypeScript compiler`
- [ESM](https://nodejs.org/api/esm.html) instead of `CommonJS`
- [Oxlint](https://oxc.rs/docs/guide/usage/linter.html) instead of `ESLint`
- [Oxfmt](https://oxc.rs/docs/guide/usage/formatter.html) instead of `Prettier`
- [pnpm](https://pnpm.io) instead of `npm`

## Configuration

1. Create a `.env` file
   - Rename the [.env.sample](.env.sample) file to `.env` to fix it.
2. Edit env config
    - Edit the file in the [config/envs](src/config/envs) folder.
    - `default`, `development`, `production`, `test`

## Installation

```sh
# 1. node_modules
pnpm install
# 2. When synchronize database from existing entities
pnpm entity:sync
# 2-1. When import entities from an existing database
pnpm entity:load
```

## Development

```sh
pnpm start:dev
```

Run [http://localhost:3000](http://localhost:3000)

## Test

```sh
pnpm test # exclude e2e
pnpm test:e2e # only e2e
```

## Production

```sh
# define NODE_ENV and PORT
pnpm build
# NODE_ENV=production PORT=8000 node dist/app.js
node dist/app.js
```

## Documentation

```sh
# https://docs.nestjs.com/openapi/cli-plugin#swc-builder
# Update the metadata before running the swagger server.
pnpm esm bin/generate-metadata.ts
# API, Swagger - src/swagger.ts
pnpm doc:api #> http://localhost:8000/api
```

## Implements

- See [app](src/app.ts), [app.module](src/app.module.ts)
- [Exceptions Filter](src/common/exceptions.filter.ts)
- [Logging Context Middleware](src/common/logger-context.middleware.ts)
- [Custom Logger](src/config/logger.config.ts) with nestjs-pino
- [Configuration by Environment](src/config/envs)
- [JWT Authentication](src/auth)
- [CRUD API Sample](src/sample)
- [Unit Test](src/sample/sample.controller.spec.ts)
- [E2E Test](test/e2e)

### Links

- [Nest Project Structure](https://github.com/CatsMiaow/node-nestjs-structure)
- [NestJS](https://docs.nestjs.com)
- [Fastify](https://fastify.dev)
- [MikroORM](https://mikro-orm.io)
- [Oxc](https://oxc.rs)
