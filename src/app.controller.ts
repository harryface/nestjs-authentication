import { Controller, Request, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/providers/local/local.quard';
import { AuthService } from './auth/services/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) { }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
