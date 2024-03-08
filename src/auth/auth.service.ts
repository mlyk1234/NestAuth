import { ConfigService } from './../config/config.service';
import { UserLoginDto } from './../user/dto/index';
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserStatus } from 'src/shared/enum';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async loginAsUser(payload: UserLoginDto): Promise<any> {
    const user = await this.userService.findByEmail(payload.email);

    if (!user) {
      return {
        error: 'Account not registed.',
      };
    }

    if (user.status === UserStatus.SUSPENDED) {
      return {
        error: 'Account Suspended.'
      }
    }

    const { password, ...result } = user;
    if (await this.verifyPassword(payload.password, password)) {
      return result;
    } else {
      return {
        error: 'Wrong username or password',
      };
    }
  }

  async createToken(user: any) {
    const payload = {
      id: user.id,
      email: user.email,
      exp:
        new Date().getTime() +
        Number(this.configService.get('JWT_EXPIRATION_TIME')) * 1000,
    };
    return {
      expiresIn: 15000 * 1000,
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async verifyPassword(plainTextPassword: string, hashedPassword: string) {
    // const isMatched = plainTextPassword === hashedPassword; // Frontend do encryption
    const isMatched = await bcrypt.compare(plainTextPassword, hashedPassword);
    return isMatched;
  }
}
