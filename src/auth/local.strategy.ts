
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  private logger = new Logger('app-controller');


  async validate(username: string, password: string): Promise<any> {
    
    this.logger.log(username, password)

    const user = await this.authService.validateUser(username, password);
    if (!user) {
      this.logger.error("gagal validasi user")
      throw new UnauthorizedException();
    }
    return user;
  }
}