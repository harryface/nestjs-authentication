import { Get, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './google.guard';

// take a look
// https://stackoverflow.com/questions/68646334/nest-js-google-loginpassport-js-with-spa-frontendreact

export class GoogleController {
  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleLogin() {
    return;
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  handleRedirect() {
    return;
  }
}
