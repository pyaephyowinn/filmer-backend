import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dtos/login-dto';
import { SingUpDto } from './dtos/sign-up.dto';

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

  async login(user: LoginDto) {
    const throwCredentialError = () => {
      throw new HttpException(
        'Username or password is incorrect',
        HttpStatus.BAD_REQUEST,
      );
    };

    const foundUser = await this.usersService.findOne(user.email);
    if (!foundUser) throwCredentialError;

    const match = await compare(user.password, foundUser.password);
    if (!match) throwCredentialError;

    return {
      message: 'success',
      data: {
        name: foundUser.name,
        email: foundUser.email,
        token: 'dummy-token',
      },
    };
  }
}
