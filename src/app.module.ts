import { ConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MySqlDriver } from '@mikro-orm/mysql';
import { User } from './entities/user.entity';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ConfigModule,
    MikroOrmModule.forRoot(),
    MikroOrmModule.forFeature({
      entities: [User],
    }),
  ],
  controllers: [UserController, AppController],
  providers: [UserService, AppService],
})
export class AppModule {}
