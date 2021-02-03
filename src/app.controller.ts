
import { Controller, Get, Request, Post, UseGuards, Body, Logger } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiProperty,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}
  private logger = new Logger('app-controller');


  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @ApiBody({})
  async login(@Request() req) {
    this.logger.log(req.user)
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBody({})
  getProfile(@Request() req) {
    return req.user;
  }
}