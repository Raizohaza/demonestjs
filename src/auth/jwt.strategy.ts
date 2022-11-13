import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly userService: UserService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
                console.log(request?.cookies?.Authentication)
                return request?.cookies?.Authentication;
            }]),
            secretOrKey: jwtConstants.secret
        });
    }

    async validate(payload: TokenPayload) {
        return this.userService.findOneByEmail(payload.email);
    }
}