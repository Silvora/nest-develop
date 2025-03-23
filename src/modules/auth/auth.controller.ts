import { Body, Controller, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '@/common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  login(@Body() body: { username: string; password: string }) {
    return this.authService.login(body);
  }

  @Post('profile')
  getProfile(@Request() req: { username: string; id: number }) {
    return req;
  }
}
