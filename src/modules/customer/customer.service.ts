import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../../entities/customer.entity';
import { User } from '../../entities/users.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(customer: Customer): Promise<Customer> {
    const res = await this.customerRepository.save(customer);
    return res;
  }

  async findAll(): Promise<Customer[]> {
    return this.customerRepository.find();
  }

  async findOne(id: number) {
    console.log('📦 Customer 微服务收到请求:', id);
    const res = await this.usersRepository.findOne({ where: { id } });
    return res;
  }
  async update(id: number, customer: Customer): Promise<void> {
    await this.customerRepository.update(id, customer);
  }

  async remove(id: number): Promise<void> {
    await this.customerRepository.delete(id);
  }
}
