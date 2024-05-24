import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { isValidEmail, isValidUUID } from '../common/utils';
import { signUpDto } from 'src/auth/auth.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async findUser(identifier: string): Promise<User | null> {
    if (!identifier) {
      return null;
    }

    let key = 'userName';
    if (isValidUUID(identifier)) {
      key = 'id';
    } else if (isValidEmail(identifier.toString())) {
      key = 'email';
    }
    return this.usersRepository.findOneBy({ [key]: identifier });
  }

  async findUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async createUser(data: signUpDto): Promise<User> {
    const user = new User();
    Object.assign(user, data);
    return this.usersRepository.save(user);
  }

  async updateUser(data, userObj?: User, id?: string): Promise<User> {
    const user = userObj
      ? userObj
      : await this.usersRepository.findOneBy({ id: id });
    if ('password' in data) {
      delete data.password;
    }
    Object.assign(user, data);
    await this.usersRepository.save(user);
    return user;
  }

  async deleteUser(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
