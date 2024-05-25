import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma.service';
import { HelperModule } from 'src/helper/helper.module';

@Module({
  imports: [HelperModule],
  providers: [UsersService, PrismaService],
  exports: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
