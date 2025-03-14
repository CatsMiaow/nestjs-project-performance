import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import type { JwtPayload } from './auth.interface.js';
import { type User, UserService } from '../user/index.js';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private user: UserService,
  ) {}

  public async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.user.fetch(username);

    if (user?.password === password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, sonarjs/no-unused-vars
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
