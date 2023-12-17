import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SingUpDto } from 'src/auth/dtos/sign-up.dto';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(user: SingUpDto) {
    const createdUser = new this.userModel(user);
    await createdUser.save();

    console.log('created a user');
    return createdUser;
  }

  async findOne() {
    return {
      name: 'alice',
      email: 'alice@gmail.com',
    };
  }
}
