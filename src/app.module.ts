import type { MikroORMOptions } from '@mikro-orm/core';
import { MySqlDriver } from '@mikro-orm/mysql';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { LoggerModule } from 'nestjs-pino';

import { AuthModule } from './auth/auth.module';
import { ExceptionsFilter } from './common';
import { CommonModule } from './common/common.module';
import { configuration, loggerOptions } from './config';
import { SampleModule } from './sample/sample.module';

@Module({
  imports: [
    // https://github.com/iamolegga/nestjs-pino
    LoggerModule.forRoot(loggerOptions),
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    // Static
    ServeStaticModule.forRoot({
      rootPath: `${__dirname}/../public`,
    }),
    /**
     * https://docs.nestjs.com/recipes/mikroorm
     * https://mikro-orm.io/docs/usage-with-nestjs
     * https://mikro-orm.io
     */
    MikroOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.getOrThrow<MikroORMOptions>('mikro'),
      inject: [ConfigService],
      driver: MySqlDriver,
    }),
    // Global
    CommonModule,
    // Authentication
    AuthModule,
    // API Sample
    SampleModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionsFilter,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {}
