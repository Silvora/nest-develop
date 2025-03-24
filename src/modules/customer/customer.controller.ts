// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Param,
//   Put,
//   Delete,
// } from '@nestjs/common';
// import { CustomerService } from './customer.service';
// import { Customer } from '../../entities/customer.entity';

// @Controller('customer')
// export class CustomerController {
//   constructor(private readonly customerService: CustomerService) {}

//   @Post()
//   create(@Body() customer: Customer): Promise<Customer> {
//     return this.customerService.create(customer);
//   }

//   @Get()
//   findAll(): Promise<Customer[]> {
//     return this.customerService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: number) {
//     return this.customerService.findOne(id);
//   }

//   @Put(':id')
//   update(@Param('id') id: string, @Body() customer: Customer): Promise<void> {
//     return this.customerService.update(+id, customer);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string): Promise<void> {
//     return this.customerService.remove(+id);
//   }
// }
// customer/customer.controller.ts
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CustomerService } from './customer.service';

@Controller()
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}
  // ⚠️ 确保这个事件名完全匹配 "get_customer_data"
  @MessagePattern('get_customer_data')
  getCustomerData(data: { id: number }) {
    // console.log('📦 Customer 微服务收到请求:', data);
    // return { id: data.id, name: 'Test Customer' };
    return this.customerService.findOne(data.id);
  }
}
