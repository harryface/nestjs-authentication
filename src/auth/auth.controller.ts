import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { GoogleController } from './providers/google/google.controller';
import { isPublic } from '../helper/public.decorator';
import { FacebookController } from './providers/facebook/facebook.controller';
import { RefreshTokenDto, SignInDto, SignUpDto } from './auth.dto';

@Controller('auth')
export class AuthController
  extends GoogleController
  implements FacebookController
{
  constructor(private authService: AuthService) {
    super();
  }

  @isPublic()
  @Post('local/login')
  async login(@Body() body: SignInDto) {
    return this.authService.login({
      identifier: body.identifier,
      password: body.password
    });
  }

  @isPublic()
  @Post('local/register')
  async register(@Body() body: SignUpDto) {
    return this.authService.registerUser(body);
  }

  @isPublic()
  @Post('local/refresh/token')
  async refreshToken(@Body() body: RefreshTokenDto) {
    return this.authService.refreshToken(body.token);
  }
}
