import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SubjectService } from './subject.service';
import { CreateSubjectDto, SubjectEntity, UpdateSubjectDto } from '../types';
import { Roles } from '../decorator/roles.decorator';
import { Role } from '../auth/role.enum';
import { UseGuards } from '@nestjs/common';
import { GqlRolesGuard } from '../auth/gqlRoles.guard';
import { GqlAuthGuard } from '../auth/passport/gql-jwt-auth.guard';
import { Public } from '../decorator/guard.config';

@Roles(Role.Admin)
@UseGuards(GqlRolesGuard)
@UseGuards(GqlAuthGuard)
@Resolver(() => SubjectEntity)
export class SubjectResolver {
    constructor(private readonly subjectService: SubjectService) {}

    @Public()
    @Query(() => [SubjectEntity], { name: 'getAllSubjects' })
    async findAll(
        @Args('count', { type: () => Number, nullable: true }) count?: number,
        @Args('index', { type: () => Number, nullable: true, defaultValue: 0 })
        index: number = 0,
    ) {
        return await this.subjectService.findAll(count, index);
    }

    @Public()
    @Query(() => SubjectEntity, { name: 'getSubjectById' })
    async findOne(@Args('id', { type: () => String }) id: string) {
        return await this.subjectService.findOne(id);
    }

    @Mutation(() => SubjectEntity, { name: 'createSubject' })
    async create(@Args('createSubjectDto') createSubjectDto: CreateSubjectDto) {
        return await this.subjectService.create(createSubjectDto);
    }

    @Mutation(() => SubjectEntity, { name: 'updateSubject' })
    async update(
        @Args('id', { type: () => String }) id: string,
        @Args('updateSubjectDto') updateSubjectDto: UpdateSubjectDto,
    ) {
        await this.subjectService.update(id, updateSubjectDto);
        return this.subjectService.findOne(id);
    }

    @Mutation(() => Boolean, { name: 'deleteSubject' })
    async remove(@Args('id', { type: () => Number }) id: number) {
        const result = await this.subjectService.remove(id);
        return result.affected > 0;
    }
}
