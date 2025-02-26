import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MajorService } from './major.service';
import {
    CreateMajorDto,
    MajorEntity,
    SubjectEntity,
    UpdateMajorDto,
    UserEntity,
} from '../types';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { Roles } from '../decorator/roles.decorator';
import { Role } from '../auth/role.enum';
import { GqlRolesGuard } from '../auth/gqlRoles.guard';
import { GqlAuthGuard } from '../auth/passport/gql-jwt-auth.guard';
import { Public } from '../decorator/guard.config';

@Roles(Role.Admin)
@UseGuards(GqlRolesGuard)
@UseGuards(GqlAuthGuard)
@Resolver(() => MajorEntity)
export class MajorResolver {
    constructor(
        private readonly majorService: MajorService,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(SubjectEntity)
        private readonly subjectRepository: Repository<SubjectEntity>,
    ) {}

    @Public()
    @Query(() => [MajorEntity])
    async getAllMajors(
        @Args('index', { type: () => Int, nullable: true })
        index?: number,
        @Args('count', { type: () => Int, nullable: true })
        count?: number,
    ) {
        return this.majorService.findAll(count ?? count, index ?? index);
    }

    @Public()
    @Query(() => MajorEntity, { nullable: true })
    async getMajorById(@Args('id', { type: () => String }) id: string) {
        return this.majorService.findOne(id);
    }

    @Mutation(() => MajorEntity)
    async createMajor(@Args('createMajorDto') createMajorDto: CreateMajorDto) {
        return this.majorService.create(createMajorDto);
    }

    @Mutation(() => MajorEntity)
    async updateMajor(
        @Args('updateMajorDto') updateMajorDto: UpdateMajorDto,
        @Args('id', { type: () => String }) id: string,
    ) {
        return this.majorService.update(id, updateMajorDto);
    }

    @Mutation(() => Boolean)
    async removeMajor(@Args('id', { type: () => String }) id: string) {
        await this.majorService.remove(id);
        return true;
    }

    @Mutation(() => Boolean)
    async addSubjectsToMajor(
        @Args('subjectsId', { type: () => [String] }) subjectsId: string[],
        @Args('majorId') majorId: string,
    ) {
        try {
            await this.majorService.addSubjectsToMajor(subjectsId, majorId);
            return true;
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    @Mutation(() => Boolean)
    async removeSubjectsFromMajor(
        @Args('subjectsId', { type: () => [String] }) subjectsId: string[],
        @Args('majorId') majorId: string,
    ) {
        try {
            await this.majorService.removeSubjectsToClass(subjectsId, majorId);
            return true;
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }
}
