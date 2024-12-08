import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, UserEntity } from '../types';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/passport/gql-jwt-auth.guard';
import { Roles } from '../decorator/roles.decorator';
import { Role } from '../auth/role.enum';
import { GqlRolesGuard } from '../auth/gqlRoles.guard';
import { SearchUserDto } from '../types/search/search-user.dto';
import { Public } from '../decorator/guard.config';
import { GqlCurrentUser } from '../decorator/GqlCurrentUser.decorator';

@UseGuards(GqlRolesGuard)
@UseGuards(GqlAuthGuard)
@Resolver(() => UserEntity)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Roles(Role.Teacher, Role.Admin)
    @Query(() => UserEntity, { name: 'getUserById' })
    async findOneUser(
        @Args('id', { type: () => String }, ParseUUIDPipe) id: string,
    ) {
        return await this.userService.findOneUser(id);
    }

    @Roles(Role.Teacher, Role.Admin)
    @Query(() => UserEntity, { name: 'getUserByUsername' })
    async findOneUserByUsername(
        @Args('username', { type: () => String }) username: string,
    ) {
        return await this.userService.findOneUserByUsername(username);
    }

    @Roles(Role.Teacher, Role.Admin)
    @Query(() => [UserEntity], { name: 'getAllUsers' })
    async getAllUsers(
        @Args('count', { type: () => Number, nullable: true }) count?: number,
        @Args('index', { type: () => Number, nullable: true }) index?: number,
        @Args('by', { type: () => SearchUserDto, nullable: true })
        dto: SearchUserDto = {},
    ): Promise<UserEntity[]> {
        return this.userService.findAllUsers(count, index, dto);
    }

    @Public()
    @Mutation(() => UserEntity, { name: 'createUser' })
    async createUser(
        @Args('createUserDto', { type: () => CreateUserDto })
        createUserDto: CreateUserDto,
    ) {
        return await this.userService.createUser(createUserDto);
    }

    @Roles(Role.Admin)
    @Mutation(() => UserEntity, { name: 'updateUser' })
    async updateUser(
        @Args('id', { type: () => String }, ParseUUIDPipe) id: string,
        @Args('updateUserDto', { type: () => UpdateUserDto })
        updateUserDto: UpdateUserDto,
    ) {
        return await this.userService.updateUser(id, updateUserDto);
    }

    @Roles(Role.Admin)
    @Mutation(() => UserEntity, { name: 'deleteUser' })
    async deleteUser(
        @Args('id', { type: () => String }, ParseUUIDPipe) id: string,
    ) {
        return await this.userService.deleteUser(id);
    }

    @Roles(Role.Student, Role.Admin, Role.SuperAdmin, Role.Teacher)
    @Query(() => UserEntity, { name: 'USER_getOwnData', nullable: true })
    async getOwnData(@GqlCurrentUser() owner) {
        return await this.userService.findOneUser(owner.Id);
    }
}
