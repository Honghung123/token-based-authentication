import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { MongooseError } from 'mongoose';

/**
 * @CatchEverythingFilter
 *
 * Filter for unhandled exceptions: both checked and unchecked exceptions.
 */

@Catch()
export class CatchEverythingFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  getHttpStatus = (ex: unknown) => {
    if (ex instanceof HttpException) {
      return ex.getStatus();
    }
    if (ex instanceof MongooseError) {
      return HttpStatus.BAD_REQUEST;
    }
    return HttpStatus.INTERNAL_SERVER_ERROR;
  };

  getMessage = (ex: unknown) => {
    if (ex instanceof HttpException) {
      const responses = new Object(ex.getResponse());
      if (typeof responses['message'] === 'string') {
        return responses['message'];
      }
      return responses['message'][0];
    }
    if (ex instanceof Error) {
      return ex.message;
    }
    return 'Unexpected error has occurred. Please try again later.';
  };

  catch(exception: unknown, host: ArgumentsHost): void {
    // console.log(exception);
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const httpStatus = this.getHttpStatus(exception);

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      message: this.getMessage(exception),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
