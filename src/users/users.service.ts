import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SingUpDto } from 'src/auth/dtos/sign-up.dto';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  create(user: SingUpDto) {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  findOne(email: string) {
    return this.userModel.findOne({
      email,
    });
  }
}
