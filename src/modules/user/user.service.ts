import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/users.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(user: User): Promise<User> {
    user.password = await bcrypt.hash(user.password, 10);
    const res = await this.userRepository.save(user);
    return {
      ...res,
    } as User;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const res = await this.userRepository.findOne({ where: { id } });
    return {
      ...res,
    } as User;
  }

  async update(id: number, user: User): Promise<void> {
    await this.userRepository.update(id, user);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async findOneByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({
      where: { username },
    }) as Promise<User>;
  }
}
