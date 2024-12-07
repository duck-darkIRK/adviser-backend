import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ROLES_KEY } from '../decorator/roles.decorator';
import { Role } from './role.enum';

@Injectable()
export class GqlRolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()],
        );
        if (!requiredRoles) {
            return true;
        }

        // Sử dụng GqlExecutionContext để hỗ trợ GraphQL
        const gqlContext = GqlExecutionContext.create(context);
        const { user } = gqlContext.getContext().req;

        // SuperAdmin bypass tất cả
        if (user.roles.includes('superAdmin')) {
            return true;
        }

        // Kiểm tra vai trò
        return requiredRoles.some((role) => user.roles?.includes(role));
    }
}
