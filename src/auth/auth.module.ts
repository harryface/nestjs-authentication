import { AnonymousStrategy } from './providers/anonymous/anonymous.strategy';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './providers/local/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './providers/google/google.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './providers/local/local.quard';
import { PasswordService } from './services/password.service';
import { JwtModule } from '@nestjs/jwt';
import { HelperModule } from 'src/helper/helper.module';

@Module({
  imports: [
    UsersModule,
    HelperModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN') }
      }),
      inject: [ConfigService]
    })
  ],
  providers: [
    AuthService,
    AnonymousStrategy,
    GoogleStrategy,
    JwtStrategy,
    PasswordService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
