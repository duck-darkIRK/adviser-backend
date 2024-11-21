import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
    Strategy,
    'jwt-refresh',
) {
    constructor(configService: ConfigService) {
        const jwtSecret = configService.get<string>('JWT_SECRET_REFRESH_TOKEN');
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtSecret,
        });
    }

    async validate(payload: any) {
        return {
            Id: payload.sub,
        };
    }
}
