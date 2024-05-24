import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { isValidEmail, isValidUUID } from '../common/utils';
import { signUpDto } from 'src/auth/auth.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User
  ) { }

  async findUser(identifier: string): Promise<User | null> {
    if (!identifier) {
      return null;
    }

    let key = 'username';
    if (isValidUUID(identifier)) {
      key = 'id';
    } else if (isValidEmail(identifier.toString())) {
      key = 'email';
    }
    return this.userModel.findOne({ where: { [key]: identifier } });
  }

  async findUsers(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async createUser(data: signUpDto): Promise<User> {
    return this.userModel.create({
      ...data
    });
  }

  async updateUser(data, userObj?: User, id?: string): Promise<User> {
    const user = userObj ? userObj : await this.findUser(id);
    if ('password' in data) {
      delete data.password;
    }
    user.set(data);
    await user.save();
    return user;
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.findUser(id);
    await user.destroy();
  }
}
