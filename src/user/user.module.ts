/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature({
        entities: [User],
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {

}
