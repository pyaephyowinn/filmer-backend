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

  findOne({ email, id }: { email?: string; id?: string }) {
    if (id) {
      return this.userModel.findById(id);
    }

    return this.userModel.findOne({
      email,
    });
  }

  updatePassword(id: string, password: string) {
    return this.userModel.findByIdAndUpdate(id, { password }, { new: true });
  }
}
