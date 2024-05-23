import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  Body
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  get(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.usersService.findUser({ id });
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatesUser
  ): Promise<User> {
    return this.usersService.updateUser(updatesUser, id);
  }
}
