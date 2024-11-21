import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../../types';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../../decorator/guard.config';

@Injectable()
export class JwtRefreshGuard extends AuthGuard('jwt-refresh') {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(
            IS_PUBLIC_KEY,
            [context.getHandler(), context.getClass()],
        );
        if (isPublic) {
            return true;
        }
        return super.canActivate(context);
    }

    handleRequest(
        err: any,
        user: User,
        info: any,
        context: ExecutionContext,
    ): any {
        if (err || !user) {
            throw (
                err ||
                new UnauthorizedException('JWT token is missing or invalid')
            );
        }

        // Lấy token từ yêu cầu (header, body, hoặc cookies)
        const request = context.switchToHttp().getRequest();
        const token =
            request.headers['authorization']?.replace('Bearer ', '') ||
            request.body.refresh_token;

        if (!token) {
            throw new UnauthorizedException('Token is missing in the request');
        }

        // Trả về cả user và token
        return { user, token };
    }
}
