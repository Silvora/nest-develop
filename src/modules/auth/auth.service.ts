import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@/modules/user/user.service';
import * as bcrypt from 'bcryptjs';
import { User } from '@/entities/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<User> {
    const user = await this.usersService.findOneByUsername(username);
    if (!user) {
      throw new UnauthorizedException('用户不存在');
    }

    // 使用异步 bcrypt.compare 验证密码
    const isPasswordValid = await bcrypt.compare(pass, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('密码错误');
    }

    // 移除密码字段，返回用户信息
    return user;
  }

  // 处理登录逻辑，生成 JWT
  async login(user: { username: string; password: string }) {
    // 验证用户
    const userInfo = await this.validateUser(user.username, user.password);

    const payload = { username: user.username, password: user.password };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: userInfo.id,
        username: userInfo.username,
      },
    };
  }
}
