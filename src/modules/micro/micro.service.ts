import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
@Injectable()
export class MicroService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3001,
      },
    });
  }

  async getCustomerData(id: number): Promise<any> {
    // console.log('📡 发送请求到 customer 微服务');
    // return await firstValueFrom(this.client.send('get_customer_data', { id }));
    console.log('📡 User 服务发送请求到 Customer 微服务');
    try {
      console.log('✅ 成功获取 Customer 数据:');
      return await firstValueFrom(
        this.client.send('get_customer_data', { id }),
      );
    } catch (error) {
      console.error('❌ User 请求 Customer 微服务失败:', error);
      throw new Error('调用 Customer 微服务失败');
    }
  }
}
