import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ClassService } from './class.service';
import { ClassEntity, CreateClassDto, UpdateClassDto } from '../types';
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
@Resolver(() => ClassEntity)
export class ClassResolver {
    constructor(private readonly classService: ClassService) {}

    @Query(() => [ClassEntity])
    async getAllClasses(
        @Args('count', { type: () => Int, nullable: true }) count?: number,
        @Args('index', { type: () => Int, nullable: true }) index?: number,
    ) {
        return this.classService.findAll(count, index);
    }

    @Public()
    @Query(() => ClassEntity)
    async getClassById(@Args('id', { type: () => Int }) id: number) {
        const classEntity = await this.classService.findOne(id);
        if (!classEntity) {
            throw new NotFoundException(`Class with ID ${id} not found`);
        }
        return classEntity;
    }

    @Public()
    @Query(() => ClassEntity)
    async getClassByCode(@Args('code', { type: () => String }) id: string) {
        const classEntity = await this.classService.findOneByCode(id);
        if (!classEntity) {
            throw new NotFoundException(`Class with code ${id} not found`);
        }
        return classEntity;
    }

    @Mutation(() => ClassEntity)
    async createClass(@Args('createClassDto') createClassDto: CreateClassDto) {
        return await this.classService.create(createClassDto);
    }

    @Mutation(() => ClassEntity)
    async updateClass(
        @Args('id', { type: () => Int }) id: number,
        @Args('updateClassDto') updateClassDto: UpdateClassDto,
    ) {
        const updatedClass = await this.classService.update(id, updateClassDto);
        if (!updatedClass) {
            throw new NotFoundException(`Class with ID ${id} not found`);
        }
        return updatedClass;
    }

    @Mutation(() => Boolean)
    async removeClass(@Args('id', { type: () => Int }) id: number) {
        const result = await this.classService.remove(id);
        return result.affected > 0;
    }

    @Mutation(() => Boolean)
    async updateSubjectInClass(
        @Args('subjectId', { type: () => String }) subjectId: string,
        @Args('classId', { type: () => String }) classId: number,
    ) {
        try {
            await this.classService.updateSubjectInClass(subjectId, classId);
            return true;
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    @Roles(Role.Teacher)
    @Mutation(() => Boolean)
    async addStudentsToClass(
        @Args('usersId', { type: () => [String] }) usersId: string[],
        @Args('classId', { type: () => Int }) classId: number,
    ) {
        try {
            await this.classService.addStudentsToClass(usersId, classId);
            return true;
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    @Roles(Role.Teacher)
    @Mutation(() => Boolean)
    async removeStudentsFromClass(
        @Args('usersId', { type: () => [String] }) usersId: string[],
        @Args('classId', { type: () => Int }) classId: number,
    ) {
        try {
            await this.classService.removeStudentsToClass(usersId, classId);
            return true;
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    @Mutation(() => Boolean)
    async addTeachersToClass(
        @Args('usersId', { type: () => [String] }) usersId: string[],
        @Args('classId', { type: () => Int }) classId: number,
    ) {
        try {
            await this.classService.addTeachersToClass(usersId, classId);
            return true;
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    @Mutation(() => Boolean)
    async removeTeachersFromClass(
        @Args('usersId', { type: () => [String] }) usersId: string[],
        @Args('classId', { type: () => Int }) classId: number,
    ) {
        try {
            await this.classService.removeTeachersToClass(usersId, classId);
            return true;
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    @Roles(Role.Student)
    @Query(() => [ClassEntity], { name: 'USER_getAllClasses' })
    async userGetAllClasses(
        @GqlCurrentUser() owner,
        @Args('count', { type: () => Int, nullable: true }) count?: number,
        @Args('index', { type: () => Int, nullable: true }) index?: number,
    ) {
        return await this.classService.userGetAllClass(owner.Id, count, index);
    }

    @Roles(Role.Teacher)
    @Query(() => [ClassEntity], { name: 'USER_getAllTeachesClass' })
    async userGetAllTeachClasses(
        @GqlCurrentUser() owner,
        @Args('count', { type: () => Int, nullable: true }) count?: number,
        @Args('index', { type: () => Int, nullable: true }) index?: number,
    ) {
        return await this.classService.userGetAllTeachClass(
            owner.Id,
            count,
            index,
        );
    }
}
