import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from 'jsonwebtoken';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly usersService: UsersService,
        private readonly configService: ConfigService,
      ) {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: 'process.env.JWT_SECRET',
        });
      }
    
      async validate(payload: JwtPayload): Promise<User> {
        const { email } = payload;
        const user = await this.usersService.findOne(email);
    
        if (!user) {
          throw new UnauthorizedException('Invalid token');
        }
        return user;
      }
}