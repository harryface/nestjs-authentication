import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ ignoreEnvFile: false, isGlobal: true }),
    SequelizeModule.forRoot({
      // uri: process.env.DATABASE_URL,
      uri: 'sqlite::memory:',
      autoLoadModels: true,
      synchronize: true
      // models: [],
    }),
    AuthModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }
