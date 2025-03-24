import { Module } from '@nestjs/common';
import { MicroService } from './micro.service';
import { MicroController } from './micro.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '../../entities/customer.entity';
import { User } from '../../entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, User])],
  providers: [MicroService],
  controllers: [MicroController],
  exports: [MicroService],
})
export class MicroModule {}
