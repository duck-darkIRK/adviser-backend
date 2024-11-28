// user.resolver.ts
import { Args, Query, Resolver } from '@nestjs/graphql';
import { User } from '../types';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/passport/gql-jwt-auth.guard';

@UseGuards(GqlAuthGuard)
@Resolver(() => User)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query(() => User, { nullable: true })
    async queryUserById(@Args('id') id: string): Promise<User | null> {
        console.log(await this.userService.findOneUser(id));
        return this.userService.findOneUser(id);
    }

    // @Mutation(() => User)
    // async createUser(@Args('input') input: CreateUserDto): Promise<User> {
    //     return this.userService.createUser(input);
    // }
}
