import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../../decorator/guard.config';
import { UserEntity } from '../../types';

@Injectable()
export class GqlAuthGuard extends AuthGuard('gql-jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req;
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

    handleRequest(err: any, user: UserEntity, info: any): any {
        if (err || !user) {
            throw (
                err ||
                new UnauthorizedException('JWT token is missing or invalid')
            );
        }
        return user;
    }
}
