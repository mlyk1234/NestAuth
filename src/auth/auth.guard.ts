import { ConfigService } from './../config/config.service';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    readonly configService: ConfigService,
    ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: this.configService.get('JWT_SECRET_KEY'),
        }
      );
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      this.validate(payload);

      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private validate(payload: any) {
    const timeDiff = payload.exp - Date.now();
    if (timeDiff <= 0) {
      throw new UnauthorizedException();
    }
    return true;
  }
}