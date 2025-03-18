import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      return user;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    const payload = { email: user.email, sub: user.i};
    return { access_token: this.jwtService.sign(payload) };
  }
}
