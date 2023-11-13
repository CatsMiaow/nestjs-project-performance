import { Injectable } from '@nestjs/common';

import type { User } from './user.interface';

@Injectable()
export class UserService {
  public async fetch(username: string): Promise<(User & { password: string }) | null> {
    return Promise.resolve({
      id: 'test',
      password: 'crypto',
      name: username,
      email: `${username}@test.com`,
    });
  }
}
