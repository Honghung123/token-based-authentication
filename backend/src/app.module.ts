import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { UsersModule } from './users/users.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { HttpExceptionFilter } from './exceptions/filter-handled.exception';
import { CatchEverythingFilter } from './exceptions/filter-unhandled.exception';
import { ConfigModule } from '@nestjs/config';

// Mongo db
import { MongooseModule } from '@nestjs/mongoose';
import { AuthGuard } from './app.guard';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [
    // Config properties from .env
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    // Connect to mongodb atlas, you must place this below the ConfigModule to make sure the env variables are loaded
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_STRING, {
      connectionName: 'users',
    }),
    UsersModule,
    AuthenticationModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CatchEverythingFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AppService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/');
  }
}
