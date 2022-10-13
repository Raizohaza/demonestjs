import { LoggerNestMiddleware } from './logger-nest.middleware';

describe('LoggerNestMiddleware', () => {
  it('should be defined', () => {
    expect(new LoggerNestMiddleware()).toBeDefined();
  });
});
