# nestjs-prisma-starter

Node.js Nest framework starter with Prisma

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
npm test # exclude e2e
npm run test:e2e
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
- [Logging Middleware](src/common/logger.middleware.ts)
- [JWT Authentication](src/auth)
- [CRUD API Sample](src/sample)
- [Unit Test](src/sample/sample.controller.spec.ts)
- [E2E Test](test/e2e)

### Links

- [Nest Project Structure](https://github.com/CatsMiaow/node-nestjs-structure)
- [Nest Sample](https://github.com/nestjs/nest/tree/master/sample)
- [Awesome Nest](https://github.com/juliandavidmr/awesome-nestjs)
- [NestJS](https://docs.nestjs.com)
- [Prisma](https://www.prisma.io)
