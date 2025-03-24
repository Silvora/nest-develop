import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGuard } from '@/modules/auth/jwt-auth.guard';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { I18nService } from 'nestjs-i18n';

import { MicroserviceOptions, Transport } from '@nestjs/microservices';
async function bootstrap() {
  // HTTP 服务
  const app = await NestFactory.create(AppModule);
  // 🌟 全局启用 JWT 守卫
  app.useGlobalGuards(new JwtAuthGuard(app.get(Reflector)));
  app.useGlobalFilters(new GlobalExceptionFilter(app.get(I18nService))); // 全局异常过滤器
  app.enableCors(); // 允许跨域
  // 打印具体异常信息
  app.useGlobalFilters({
    catch(exception: any) {
      console.error('💥 全局异常捕获:', exception);
    },
  });
  // 微服务（TCP 通信）
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3001, // 微服务专用端口
    },
  });

  await app.startAllMicroservices();

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap().catch((err) => {
  console.error('Failed to start the application:', err);
  process.exit(1);
});
