/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// src/common/filters/global-exception.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { Response } from 'express';
import { Logger } from '@nestjs/common';

@Catch()
@Injectable()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  constructor(private readonly i18n: I18nService) {}

  async catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // 确定状态码
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // 获取原始错误消息
    let message: string;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const lang = request.headers['accept-language'] || 'en';

    switch (true) {
      case exception instanceof HttpException:
        // eslint-disable-next-line no-case-declarations
        const exceptionResponse = exception.getResponse();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        message =
          typeof exceptionResponse === 'string'
            ? exceptionResponse
            : (exceptionResponse as any).message || exception.message;
        break;
      default:
        message = 'INTERNAL_SERVER_ERROR';
    }

    // 翻译错误消息
    // eslint-disable-next-line @typescript-eslint/await-thenable
    const translatedMessage = await this.i18n.translate(
      `errors.${message.toUpperCase()}`,
      {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        lang,
        defaultValue: message, // 如果翻译不存在，使用原始消息
      },
    );

    // 构建标准化响应
    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: translatedMessage,
      error: HttpStatus[status],
    };

    // 记录错误日志（不中断运行）
    this.logger.error(
      `Request failed: ${request.method} ${request.url} - Status: ${status} - Message: ${translatedMessage}`,
      exception.stack,
    );

    // 返回响应，不中断应用
    response.status(status).json(errorResponse);
  }
}
