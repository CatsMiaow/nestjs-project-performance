import { Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import type { Request } from 'express';

import { User } from '../user';
import { Payload } from './auth.interface';
import { AuthService } from './auth.service';
import { JwtAuthGuard, LocalAuthGuard } from './guards';

@Controller()
export class AuthController {
  constructor(private auth: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  public login(@Req() req: Request): { access_token: string } {
    return this.auth.login(<User>req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('auth/check')
  public check(@Req() req: Request): Payload {
    return <Payload>req.user;
  }
}
