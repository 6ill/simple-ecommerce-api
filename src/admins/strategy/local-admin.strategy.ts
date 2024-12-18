import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminsService } from '../admins.service';

@Injectable()
export class LocalAdminStrategy extends PassportStrategy(Strategy, 'local-admin') {
  constructor(private adminsService: AdminsService) {
    super();
  }

async validate(username: string, password: string): Promise<string> {
    const jwtToken = await this.adminsService.validateUser(username, password);
    if (!jwtToken) {
      throw new UnauthorizedException();
    }
    console.log("hasil validate strat: ", jwtToken);
    return jwtToken;
  }
}