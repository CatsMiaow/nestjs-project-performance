import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import type { JwtPayload } from './auth.interface';
import { User, UserService } from '../user';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private user: UserService,
  ) {}

  public async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.user.fetch(username);

    if (user?.password === password) {
      const { password: pass, ...result } = user;
      return result;
    }

    return null;
  }

  public login(user: User): { access_token: string } {
    const payload: JwtPayload = { username: user.name, sub: user.id };

    return {
      access_token: this.jwt.sign(payload),
    };
  }
}
