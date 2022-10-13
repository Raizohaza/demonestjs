import { Injectable, NestMiddleware, Logger, Inject } from '@nestjs/common';
import { Logger as WinstonModule } from 'winston';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerNestMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');
  constructor(
    @Inject('winston')
    private WinstonLogger: WinstonModule,
  ) {}

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, path: url } = request;
    const userAgent = request.get('user-agent') || '';

    request.on('readable', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');
      console.log('connected!');

      this.logger.log(
        `${method} ${url} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
      );
      this.WinstonLogger.info(
        `${method} ${url} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
      );
    });
    response.on('close', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      this.logger.log(
        `${method} ${url} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
      );
      this.WinstonLogger.info(
        `${method} ${url} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
      );
    });

    next();
  }
}
