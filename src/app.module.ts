import { Module } from '@nestjs/common';
import { DatabaseModule } from './config/database.config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { CustomerModule } from './modules/customer/customer.module';
import { MicroModule } from './modules/micro/micro.module';
import { ConfigModule } from '@nestjs/config';
import {
  I18nModule,
  I18nJsonLoader,
  AcceptLanguageResolver,
} from 'nestjs-i18n';
import * as path from 'path';

console.log(path.join(__dirname, '/i18n'));
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`, // 根据 NODE_ENV 加载对应的环境变量文件
      isGlobal: true, // 全局可用
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'zh', // 默认语言
      loader: I18nJsonLoader, // 使用 JSON 文件加载翻译
      loaderOptions: {
        path: path.join(process.cwd(), 'src/i18n/'), // 翻译文件目录
        watch: true, // 开发时热加载
      },
      resolvers: [AcceptLanguageResolver], // 根据请求头 Accept-Language 解析语言
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    CustomerModule,
    MicroModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
