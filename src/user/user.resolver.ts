// user.resolver.ts
import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserQL } from '../types';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/passport/gql-jwt-auth.guard';

@UseGuards(GqlAuthGuard)
@Resolver(() => UserQL)
export class UserResolver {
    constructor(
        private readonly userService: UserService,
        private readonly authService: UserService,
    ) {}

    @Query(() => UserQL, { nullable: true })
    async queryUserById(@Args('id') id: string): Promise<UserQL | null> {
        console.log(await this.userService.findOneUser(id));
        return this.userService.findOneUser(id);
    }

    // @Mutation(() => UserQL)
    // async createUser(@Args('input') input: CreateUserDto): Promise<UserQL> {
    //     return this.userService.createUser(input);
    // }
}
