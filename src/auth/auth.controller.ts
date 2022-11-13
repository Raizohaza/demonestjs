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
import { CreateAuthDto } from './dto/create-auth.dto';
import RegisterDto from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LocalAuthGuard } from './local-auth.guard';
import JwtAuthenticationGuard from './jwt-authentication.guard';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) response: Response) {
    const cookie = this.authService.getCookieWithJwtToken(loginDto.email);
    response.setHeader('Set-Cookie', cookie);
    loginDto.password = undefined;
    return this.authService.login(loginDto);
  }

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return this.authService.register(registrationData);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('logout')
  async logout(@Res() response: Response) {
    response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    return response.status(200).json({ statusCode: 200, message: "You are logged out" });
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('profile')
  getProfile(@Request() req, @Res() response: Response) {
    req.user.password = undefined;
    return response.status(200).json(
      {
        statusCode: 200,
        message: "Get user profile",
        user: req.user
      });
  }
}
