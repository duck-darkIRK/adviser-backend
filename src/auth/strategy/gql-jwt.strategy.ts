import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GraphqlJwtStrategy extends PassportStrategy(Strategy, 'gql-jwt') {
    constructor(
        private readonly authService: AuthService,
        private configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('JWT_SECRET'),
            ignoreExpiration: false,
        });
    }

    async validate(payload: any) {
        return {
            Id: payload.sub,
            username: payload.username,
            roles: payload.roles,
        };
    }
}
