import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
export class LocalUserStrategy extends PassportStrategy(Strategy, 'local-user') {
  constructor(private usersService: UsersService) {
    super();
  }

async validate(username: string, password: string): Promise<string> {
    const jwtToken = await this.usersService.validateUser(username, password);
    if (!jwtToken) {
      throw new UnauthorizedException();
    }
    return jwtToken;
  }
}