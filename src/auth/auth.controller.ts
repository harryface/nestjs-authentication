import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { GoogleController } from './providers/google/google.controller';
import { isPublic } from './public.decorator';
import { FacebookController } from './providers/facebook/facebook.controller';
import { signInDto, signUpDto } from './auth.dto';

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
  async login(@Body() body: signInDto) {
    return this.authService.login({
      identifier: body.identifier,
      password: body.password
    });
  }

  @isPublic()
  @Post('local/register')
  async register(@Body() body: signUpDto) {
    return this.authService.registerUser(body);
  }
}
