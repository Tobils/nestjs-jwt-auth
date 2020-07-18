import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ){}


    async validateUser(username: String, password: String): Promise<Boolean> {
        const user = await this.usersService.findOne(username);

        if( user && user.password === password){
            return true;
        } else {
            return false;
        }
    }


    async login(user: any){
        const payload = {usrname : user.username}
        return {
           access_token :  this.jwtService.sign(payload)
        }
    }
}

