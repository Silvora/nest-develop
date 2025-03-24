import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller()
export class AuthMicroservice {
  constructor(private authService: AuthService) {}

  @MessagePattern('login')
  async login(data: { username: string; password: string }) {
    return this.authService.validateUser(data.username, data.password);
  }
}
