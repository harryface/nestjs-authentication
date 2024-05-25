import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  Body,
  UseInterceptors,
  UploadedFile
} from '@nestjs/common';
import { Express } from 'express';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/multer.config';
import { S3Service } from 'src/helper/s3.service';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private s3Service: S3Service
  ) {}

  @Get(':id')
  get(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.usersService.findUser({ id });
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatesUser,
    @UploadedFile() file?: Express.Multer.File
  ): Promise<User> {
    // TODO: Revisit
    const pic_name = await this.s3Service.uploadFile(file, id);
    updatesUser['pic'] = pic_name;
    return this.usersService.updateUser(updatesUser, id);
  }
}
