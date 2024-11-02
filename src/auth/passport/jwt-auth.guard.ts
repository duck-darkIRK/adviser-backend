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
export class JwtAuthGuard extends AuthGuard('jwt') {
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

    handleRequest(err: any, user: User, info: any): any {
        // You can throw an exception based on either "info" or "err" arguments
        if (err || !user) {
            throw (
                err ||
                new UnauthorizedException('JWT token is missing or invalid')
            );
        }
        return user;
    }
}
