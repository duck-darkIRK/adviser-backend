import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, UserEntity } from '../types';
import { ParseUUIDPipe } from '@nestjs/common';
import { SafeUserEntity } from '../types/entities/user.entity';

@Resolver(() => UserEntity)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query(() => SafeUserEntity, { name: 'getUserById' })
    async findOneUser(
        @Args('id', { type: () => String }, ParseUUIDPipe) id: string,
    ) {
        return await this.userService.findOneUser(id);
    }

    @Query(() => SafeUserEntity, { name: 'getUserByUsername' })
    async findOneUserByUsername(
        @Args('username', { type: () => String }) username: string,
    ) {
        return await this.userService.findOneUserByUsername(username);
    }

    @Mutation(() => SafeUserEntity, { name: 'createUser' })
    async createUser(
        @Args('createUserDto', { type: () => CreateUserDto })
        createUserDto: CreateUserDto,
    ) {
        return await this.userService.createUser(createUserDto);
    }

    @Mutation(() => SafeUserEntity, { name: 'updateUser' })
    async updateUser(
        @Args('id', { type: () => String }, ParseUUIDPipe) id: string,
        @Args('updateUserDto', { type: () => UpdateUserDto })
        updateUserDto: UpdateUserDto,
    ) {
        return await this.userService.updateUser(id, updateUserDto);
    }

    @Mutation(() => SafeUserEntity, { name: 'deleteUser' })
    async deleteUser(
        @Args('id', { type: () => String }, ParseUUIDPipe) id: string,
    ) {
        return await this.userService.deleteUser(id);
    }
}
