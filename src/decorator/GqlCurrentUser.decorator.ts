import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GqlCurrentUser = createParamDecorator(
    (
        data: unknown,
        context: ExecutionContext,
    ): { Id: string; roles: string[] } => {
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req.user;
    },
);
