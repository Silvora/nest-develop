import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGuard } from '@/modules/auth/jwt-auth.guard';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { I18nService } from 'nestjs-i18n';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 🌟 全局启用 JWT 守卫
  app.useGlobalGuards(new JwtAuthGuard(app.get(Reflector)));
  app.useGlobalFilters(new GlobalExceptionFilter(app.get(I18nService))); // 全局异常过滤器
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap().catch((err) => {
  console.error('Failed to start the application:', err);
  process.exit(1);
});
