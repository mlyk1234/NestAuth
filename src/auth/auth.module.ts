import { ConfigService } from './../config/config.service';
import { ConfigModule } from './../config/config.module';
import { UserModule } from './../user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    ConfigModule,
    JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
            return {
                secret: configService.get('JWT_SECRET_KEY'),
                ...(configService.get('JWT_EXPIRATION_TIME')
                ? {
                    expiresIn: Number(configService.get('JWT_EXPIRATION_TIME')),
                    }
                : {}),
            };
        },
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
