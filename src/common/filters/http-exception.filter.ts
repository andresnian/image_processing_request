import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const res = context.getResponse();
    const req = context.getRequest();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const msg =
      exception instanceof HttpException ? exception.getResponse : exception;
    this.logger.error(`Status ${status} Error ${JSON.stringify(msg)}`);
    res.status(status).json({
      timestamp: new Date().toISOString(),
      path: req.url,
      error: msg,
    });
  }
}
