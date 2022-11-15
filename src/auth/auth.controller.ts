import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Res,
  Request
} from '@nestjs/common';

import { Response, } from 'express';
import { AuthService } from './auth.service';
import RegisterDto from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './local-auth.guard';
import JwtAuthenticationGuard from './jwt-authentication.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() response: Response) {
    return this.authService.login(loginDto, response);
  }

  @Post('register')
  async register(@Body() registrationData: RegisterDto, @Res() response: Response) {
    return this.authService.register(registrationData, response);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('logout')
  async logout(@Res() response: Response) {
    return this.authService.logout(response);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('profile')
  async getProfile(@Request() req, @Res() response: Response) {
    return this.authService.getProfile(req, response);
  }
}
