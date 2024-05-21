import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
	imports: [SequelizeModule.forFeature([User])],
	providers: [UsersService],
	exports: [UsersService, SequelizeModule],
	controllers: [UsersController]
})
export class UsersModule {}
