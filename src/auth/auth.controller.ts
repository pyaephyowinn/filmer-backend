import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SingUpDto } from './dtos/sign-up.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login-dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authServices: AuthService) {}

  @Post('signup')
  signUp(@Body() user: SingUpDto) {
    return this.authServices.signUp(user);
  }

  @Post('login')
  login(@Body() user: LoginDto) {
    return this.authServices.login(user);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  getProfile(@Request() req) {
    return {
      message: 'success',
      user: req.user,
    };
  }
}
