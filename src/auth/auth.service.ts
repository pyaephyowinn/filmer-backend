import { Injectable } from '@nestjs/common';
import { SingUpDto } from './dtos/sign-up.dto';
import { UsersService } from 'src/users/users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { genSalt, hash, compare } from 'bcrypt';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  async signUp(user: SingUpDto) {
    // * ---- hash the password ----

    const SALT_ROUND = 10;
    const salt = await genSalt(SALT_ROUND);
    const hashedPassword = await hash(user.password, salt);

    const createdUser = await this.usersService.create({
      ...user,
      password: hashedPassword,
    });

    return {
      message: 'success',
      data: {
        name: createdUser.name,
        email: createdUser.email,
        token: 'dummy-token',
      },
    };
  }
}
