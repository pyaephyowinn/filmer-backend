import { Body, Controller, Post } from '@nestjs/common';
import { SingUpDto } from './dtos/sign-up.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authServices: AuthService) {}

  @Post('signup')
  signUp(@Body() user: SingUpDto) {
    console.log('sign-up triggered', user);
    return this.authServices.signUp(user);
  }

  @Post('login')
  login(@Body() user: LoginDto) {
    return this.authServices.login(user);
  }
}
