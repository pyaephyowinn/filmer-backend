import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dtos/login-dto';
import { SingUpDto } from './dtos/sign-up.dto';
import { ChangePasswordDto } from './dtos/change-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async signUp(user: SingUpDto) {
    const hashedPassword = await this.generateHashPassword(user.password);
    const createdUser = await this.usersService.create({
      ...user,
      password: hashedPassword,
    });

    const token = await this.jwtService.signAsync({
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
    });

    return {
      message: 'success',
      data: {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
        token,
      },
    };
  }

  async login(user: LoginDto) {
    const throwCredentialError = () => {
      throw new BadRequestException('Username or password is incorrect');
    };

    const foundUser = await this.usersService.findOne({ email: user.email });
    if (!foundUser) throwCredentialError();

    const match = await compare(user.password, foundUser.password);
    if (!match) throwCredentialError();

    const token = await this.jwtService.signAsync({
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
    });

    return {
      message: 'success',
      data: {
        name: foundUser.name,
        email: foundUser.email,
        token,
      },
    };
  }

  async changePassword(id: string, user: ChangePasswordDto) {
    const foundUser = await this.usersService.findOne({ id });
    const match = await compare(user.password, foundUser.password);

    if (!match) throw new BadRequestException('Password is incorrect');
    const hashedNewPassword = await this.generateHashPassword(user.newPassword);

    return this.usersService.updatePassword(id, hashedNewPassword);
  }

  generateToken(obj: Object) {
    return this.jwtService.signAsync(obj);
  }

  async generateHashPassword(password: string) {
    const SALT_ROUND = 10;
    const salt = await genSalt(SALT_ROUND);
    const hashedPassword = await hash(password, salt);
    return hashedPassword;
  }
}
