import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User, Prisma } from '@prisma/client';
import { SignUpDto } from 'src/auth/auth.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findUser(
    identifier: Prisma.UserWhereUniqueInput
  ): Promise<User | null> {
    return await this.prismaService.user.findUnique({
      where: identifier
    });
  }

  async findUsers(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  async createUser(data: SignUpDto): Promise<User> {
    return this.prismaService.user.create({ data });
  }

  async updateUser(data, id: string): Promise<User> {
    if ('password' in data) {
      delete data.password;
    }
    const user = await this.prismaService.user.update({
      where: { id },
      data
    });
    return user;
  }

  async deleteUser(id: string): Promise<void> {
    await this.prismaService.user.delete({
      where: { id }
    });
  }
}
