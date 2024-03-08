/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto';

@Controller('/api/v1/users')
export class UserController {
  constructor(
    private userService: UserService
  ) {}

  @Post('register')
  async register(
    @Body() payload: RegisterUserDto,
  ): Promise<any> {
    try {
      await this.userService.register(payload);
      return {
        statusCode: HttpStatus.OK,
        data: {},
        message: 'Registered User Account Successful.',
      };
    } catch (error) {
      console.log(error)
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        data: {},
        message: error
      };
    }
  }
}
