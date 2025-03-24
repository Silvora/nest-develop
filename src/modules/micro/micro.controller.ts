import { Controller, Get } from '@nestjs/common';
import { MicroService } from './micro.service';

@Controller('micro')
export class MicroController {
  constructor(private readonly microService: MicroService) {}

  @Get('customers')
  async getCustomers(): Promise<any> {
    console.log('发送消息到 Customer 微服务');
    return await this.microService.getCustomerData(1);
  }
}
