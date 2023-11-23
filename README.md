# nestjs-project-performance

Node.js framework NestJS project for performance

If you focus on the performance or features of the module, you can consider using another module as an alternative in NestJS. \
In this example, the changed modules are as follows.

- [Fastify](https://docs.nestjs.com/techniques/performance) instead of `Express`
- [Prisma](https://docs.nestjs.com/recipes/prisma) with [nestjs-prisma](https://nestjs-prisma.dev) instead of `TypeORM`
- [SWC](https://docs.nestjs.com/recipes/swc#swc) instead of `TypeScript compiler`
- [Vitest](https://docs.nestjs.com/recipes/swc#vitest) with [vitest-mock-extended](https://www.npmjs.com/package/vitest-mock-extended) instead of `Jest`

## Configuration

1. Create a `.env` file
   - Rename the [.env.sample](.env.sample) file to `.env` to fix it.
2. Edit the [schema.prisma](prisma/schema.prisma) file.

## Installation

```sh
# 1. node_modules
npm ci
# 2-1. Generate schema from existing database
npx prisma db pull
# Convert snake_case to PascalCase, camelCase in the generated schema
npx @paljs/cli schema camel-case
# 2-2. Write a model and generate it in the database
npx prisma migrate dev --preview-feature
# 3. Apply schema model to @prisma/client
npx prisma generate
```

## Development

```sh
npm run start:dev
```

Run [http://localhost:3000](http://localhost:3000)

## Test

```sh
npm test
npm run test:e2e # only e2e
```

## Production

```sh
# define NODE_ENV and PORT
npm run build
# NODE_ENV=production PORT=8000 node dist/app
node dist/app
# OR
npm start
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
- [Prisma](https://www.prisma.io)
- [Vitest](https://vitest.dev)
