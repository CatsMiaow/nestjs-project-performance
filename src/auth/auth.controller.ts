import { Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';

import type { Payload } from './auth.interface.js';
import { AuthService } from './auth.service.js';
import { JwtAuthGuard, LocalAuthGuard } from './guards/index.js';

@Controller()
export class AuthController {
  constructor(private auth: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  public login(@Req() req: FastifyRequest): { access_token: string } {
    return this.auth.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('auth/check')
  public check(@Req() req: FastifyRequest): Payload {
    return req.user;
  }
}
