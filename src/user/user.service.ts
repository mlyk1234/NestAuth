import { UserStatus } from './../shared/enum/index';
import { InjectRepository } from '@mikro-orm/nestjs';
import { RegisterUserDto } from './dto/index';
import * as bcrypt from 'bcrypt';
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/mysql';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: EntityRepository<User>,
    private readonly em: EntityManager,
  ) {}

  async findByEmail(email: string) {
    const query = await this.userRepository
      .findOne({
        email: email
      })

    return query;
  }

  async register(payload: RegisterUserDto) {
    const res = await this.findByEmail(payload.email);
    if (!res) {
      const hashed = await bcrypt.hash(payload.password, 10);

      const result = this.userRepository.create({
        ...payload,
        password: hashed,
        status: UserStatus.ACTIVE,
      })
  
      await this.em.flush();
      return result;
    } else {
      return 'Registered'
    }
  }
}
