import { Dependencies, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../types';
import { ConfigService } from '@nestjs/config';

@Injectable()
@Dependencies(UserService, JwtService, ConfigService)
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async login(user: UserEntity) {
        const payload = {
            username: user.username,
            sub: user.Id,
            roles: user.roles,
        };
        const newRefreshToken = this.jwtService.sign(
            {
                sub: user.Id,
            },
            {
                secret: this.configService.get<string>(
                    'JWT_SECRET_REFRESH_TOKEN',
                ),
                expiresIn: this.configService.get<string>('TIME_ALIVE'),
            },
        );

        return {
            access_token: this.jwtService.sign(payload),
            refresh_token: await this.userService.saveRefreshToken(
                newRefreshToken,
                user.Id,
            ),
        };
    }

    async provideAccessToken(
        username: string,
        Id: string,
        roles: string[],
    ): Promise<{ access_token: string }> {
        const payload = { username, sub: Id, roles };
        return { access_token: this.jwtService.sign(payload) };
    }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.findOneUserByUsername(username);
        if (user && (await bcrypt.compare(pass, user.password))) {
            return user;
        }
        return null;
    }
}
