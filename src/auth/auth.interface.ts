import type { User } from '../user';

export interface JwtPayload {
  sub: string;
  username: string;
}

export type Payload = Omit<User, 'email'>;
