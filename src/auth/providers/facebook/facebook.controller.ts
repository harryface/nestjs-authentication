import { Get, UseGuards } from '@nestjs/common';
import { FacebookAuthGuard } from './facebook.guard';

//https://dev.to/elishaking/how-to-implement-facebook-login-with-nestjs-90h
export class FacebookController {
  @Get('facebook/login')
  @UseGuards(FacebookAuthGuard)
  handleLogin() {
    return;
  }

  @Get('facebook/redirect')
  @UseGuards(FacebookAuthGuard)
  handleRedirect() {
    return;
  }
}
