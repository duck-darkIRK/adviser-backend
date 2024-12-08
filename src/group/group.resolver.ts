import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GroupService } from './group.service';
import { CreateGroupDto, GroupEntity, UpdateGroupDto } from '../types';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { Roles } from '../decorator/roles.decorator';
import { Role } from '../auth/role.enum';
import { GqlRolesGuard } from '../auth/gqlRoles.guard';
import { GqlAuthGuard } from '../auth/passport/gql-jwt-auth.guard';
import { Public } from '../decorator/guard.config';
import { GqlCurrentUser } from '../decorator/GqlCurrentUser.decorator';

@Roles(Role.Admin)
@UseGuards(GqlRolesGuard)
@UseGuards(GqlAuthGuard)
@Resolver(() => GroupEntity)
export class GroupResolver {
    constructor(private readonly groupService: GroupService) {}

    @Query(() => [GroupEntity])
    async getAllGroups(
        @Args('count', { type: () => Int, nullable: true }) count?: number,
        @Args('index', { type: () => Int, nullable: true }) index?: number,
    ) {
        return this.groupService.findAll(count, index);
    }

    @Public()
    @Query(() => GroupEntity)
    async getGroupById(@Args('id', { type: () => Int }) id: number) {
        const groupEntity = await this.groupService.findOne(id);
        if (!groupEntity) {
            throw new NotFoundException(`Group with ID ${id} not found`);
        }
        return groupEntity;
    }

    @Mutation(() => GroupEntity)
    async createGroup(@Args('createGroupDto') createGroupDto: CreateGroupDto) {
        return this.groupService.create(createGroupDto);
    }

    @Mutation(() => GroupEntity)
    async updateGroup(
        @Args('id', { type: () => Int }) id: number,
        @Args('updateGroupDto') updateGroupDto: UpdateGroupDto,
    ) {
        const updatedGroup = await this.groupService.update(id, updateGroupDto);
        if (!updatedGroup) {
            throw new NotFoundException(`Group with ID ${id} not found`);
        }
        return updatedGroup;
    }

    @Mutation(() => Boolean)
    async removeGroup(@Args('id', { type: () => Int }) id: number) {
        const result = await this.groupService.remove(id);
        return result.affected > 0;
    }

    @Roles(Role.Teacher)
    @Mutation(() => Boolean)
    async addStudentsToGroup(
        @Args('usersId', { type: () => [String] }) usersId: string[],
        @Args('groupId') groupId: number,
    ) {
        try {
            await this.groupService.addStudentsToGroup(usersId, groupId);
            return true;
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    @Roles(Role.Teacher)
    @Mutation(() => Boolean)
    async removeStudentsFromGroup(
        @Args('usersId', { type: () => [String] }) usersId: string[],
        @Args('groupId') groupId: number,
    ) {
        try {
            await this.groupService.removeStudentsFromGroup(usersId, groupId);
            return true;
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    @Mutation(() => Boolean)
    async addAdvisersToGroup(
        @Args('usersId', { type: () => [String] }) usersId: string[],
        @Args('groupId') groupId: number,
    ) {
        try {
            await this.groupService.addAdvisersToGroup(usersId, groupId);
            return true;
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    @Mutation(() => Boolean)
    async removeAdvisersFromGroup(
        @Args('usersId', { type: () => [String] }) usersId: string[],
        @Args('groupId') groupId: number,
    ) {
        try {
            await this.groupService.removeAdvisersFromGroup(usersId, groupId);
            return true;
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    @Roles(Role.Student)
    @Query(() => [GroupEntity], { name: 'USER_getAllGroups' })
    async userGetAllGroups(
        @GqlCurrentUser() owner,
        @Args('count', { type: () => Int, nullable: true }) count?: number,
        @Args('index', { type: () => Int, nullable: true }) index?: number,
    ) {
        return await this.groupService.userGetAllGroups(owner.Id, count, index);
    }

    @Roles(Role.Teacher)
    @Query(() => [GroupEntity], { name: 'USER_getAllAdviseGroups' })
    async userGetAllAdviseGroups(
        @GqlCurrentUser() owner,
        @Args('count', { type: () => Int, nullable: true }) count?: number,
        @Args('index', { type: () => Int, nullable: true }) index?: number,
    ) {
        return await this.groupService.userGetAllAdviseGroups(
            owner.Id,
            count,
            index,
        );
    }
}
