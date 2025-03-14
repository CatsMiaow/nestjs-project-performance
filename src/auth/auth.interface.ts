import type { User } from '../user/index.js';

export interface JwtPayload {
  sub: string;
  username: string;
}

export type Payload = Omit<User, 'email'>;
