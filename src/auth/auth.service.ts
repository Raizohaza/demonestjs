import { HttpStatus, Injectable } from '@nestjs/common';
import { Response, } from 'express';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import RegisterDto from './dto/register.dto';
import LoginDto from './dto/login.dto';
import { ErrorMessage, SuccesMessage, jwtConstants } from 'src/common/message';

enum MySQLErrorCode {
  UniqueViolation = 'ER_DUP_ENTRY',
}
@Injectable()
export class AuthService {

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    const isPasswordMatching = await bcrypt.compare(
      password,
      user.password
    );
    if (user && isPasswordMatching) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  public async register(registrationData: RegisterDto, response: Response) {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    try {
      const createdUser = await this.userService.create({
        ...registrationData,
        password: hashedPassword,
      });

      createdUser.password = undefined;
      return response.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: createdUser,
        messages: SuccesMessage.MSG001
      });
    } catch (error) {
      if (error?.code === MySQLErrorCode.UniqueViolation) {
        return response.status(HttpStatus.BAD_REQUEST).json({
          code: HttpStatus.BAD_REQUEST,
          data: {},
          messages: ErrorMessage.ERR001
        });
      }
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        data: {},
        messages: ErrorMessage.ERR002
      });
    }
  }

  async login(loginDto: LoginDto, response: Response) {
    const cookie = await this.getCookieWithJwtToken(loginDto.email);
    response.setHeader('Set-Cookie', cookie);
    loginDto.password = undefined;

    const payload = { email: loginDto.email };

    return response.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: { access_token: this.jwtService.sign(payload) },
      messages: SuccesMessage.MSG002
    });
  }

  async getProfile(req, response: Response) {
    req.user.password = undefined;
    return response.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: req.user,
      message: SuccesMessage.MSG003,
    });
  }

  async logout(response: Response) {
    response.setHeader('Set-Cookie', this.getCookieForLogOut());
    return response.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      message: SuccesMessage.MSG004
    });
  }

  public getCookieWithJwtToken(email: string) {
    const payload: TokenPayload = { email };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${jwtConstants.TOKEN_EXP}`;
  }

  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
}
