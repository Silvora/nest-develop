import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { Customer } from '../../entities/customer.entity';
import { User } from '../../entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, User])],
  providers: [CustomerService],
  controllers: [CustomerController],
  exports: [CustomerService],
})
export class CustomerModule {}
