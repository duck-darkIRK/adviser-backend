import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from '../../types';

@Injectable()
export class GqlAuthGuard extends AuthGuard('gql-jwt') {
    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req;
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
