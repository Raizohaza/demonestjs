import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { LocalStrategy } from './helper/local.strategy';
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') implements CanActivate {
  constructor(stategy: LocalStrategy) {
    super();
    this.stategy = stategy;
  }
  stategy: LocalStrategy;
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const { email, password } = req.body;
    if (!!email === true && !!password === true) {
      return this.stategy.validate(email, password).then((data) => {
        req['data'] = data;
        return req;
      });
    }
    return false;
  }
}
