import { Injectable } from '@nestjs/common';

import type { User } from './user.interface.js';

@Injectable()
export class UserService {
  public async fetch(username: string): Promise<(User & { password: string }) | null> {
    return Promise.resolve({
      id: 'test',
      // eslint-disable-next-line sonarjs/no-hardcoded-passwords
      password: 'crypto',
      name: username,
      email: `${username}@test.com`,
    });
  }
}
