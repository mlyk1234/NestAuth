import { UserService } from './../user/user.service';
import { AuthService } from './auth.service';
import { UserLoginDto } from './../user/dto/index';
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post, UnauthorizedException, HttpStatus, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @Post('user-login')
  async userLogin(
    @Body() payload: UserLoginDto
  ): Promise<any> {
    try {
      const user = await this.authService.loginAsUser(payload);
      if (user.error) {
        let message = `Login Failed - ${user.error}`;
        throw new UnauthorizedException(message);
      } else {
        const response = {
          id: user.id,
          email: user.email,
          status: user.status,
        };

        const result = await this.authService.createToken(response);
        return {
          success: true,
          data: result,
        };
      }
    } catch (error) {
      console.log(error);
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        data: {},
        message: error
      };
    }
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async getMe(
    @Request() req
  ) {
    try {
      const result = req.user
      return {
        statusCode: HttpStatus.ACCEPTED,
        data: result,
        message: []
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        data: {},
        message: error
      };
    }
  }
}
