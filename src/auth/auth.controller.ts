import { Body, Controller, Post } from '@nestjs/common';
import { SingUpDto } from './dtos/sign-up.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authServices: AuthService) {}

  @Post('signup')
  signUp(@Body() user: SingUpDto) {
    console.log('sign-up triggered', user);
    return this.authServices.signUp(user);
  }
}
