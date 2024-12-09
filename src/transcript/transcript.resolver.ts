import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TranscriptService } from './transcript.service';
import {
    CreateTranscriptDto,
    TranscriptEntity,
    UpdateTranscriptDto,
} from '../types';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/passport/gql-jwt-auth.guard';
import { GqlRolesGuard } from '../auth/gqlRoles.guard';
import { Roles } from '../decorator/roles.decorator';
import { Role } from '../auth/role.enum';
import { GqlCurrentUser } from '../decorator/GqlCurrentUser.decorator';

@Roles(Role.Admin)
@UseGuards(GqlRolesGuard)
@UseGuards(GqlAuthGuard)
@Resolver(() => TranscriptEntity)
export class TranscriptResolver {
    constructor(private readonly transcriptService: TranscriptService) {}

    @Mutation(() => TranscriptEntity)
    async createTranscript(
        @Args('createTranscriptDto') createTranscriptDto: CreateTranscriptDto,
    ) {
        return await this.transcriptService.create(createTranscriptDto);
    }

    @Query(() => [TranscriptEntity], { name: 'getAllTranscripts' })
    async findAllTranscripts(
        @Args('count', { type: () => Int, nullable: true })
        count?: number,
        @Args('index', { type: () => Int, nullable: true })
        index?: number,
    ) {
        return await this.transcriptService.findAll(count, index);
    }

    @Query(() => TranscriptEntity, { name: 'getTranscriptById' })
    async findOneTranscript(
        @Args('id', { type: () => Int }, ParseIntPipe) id: number,
    ) {
        return await this.transcriptService.findOne(id);
    }

    @Mutation(() => TranscriptEntity)
    async updateTranscript(
        @Args('id', { type: () => Int }, ParseIntPipe) id: number,
        @Args('updateTranscriptDto') updateTranscriptDto: UpdateTranscriptDto,
    ) {
        return await this.transcriptService.update(id, updateTranscriptDto);
    }

    @Roles(Role.Student)
    @Query(() => [TranscriptEntity], { name: 'USER_getTranscripts' })
    async userGetAllTranscript(@GqlCurrentUser() owner) {
        return await this.transcriptService.userGetOwnTranscript(owner.Id);
    }

    @Roles(Role.Teacher)
    @Query(() => [TranscriptEntity], { name: 'USER_getStudentTranscripts' })
    async userGetStudentTranscript(
        @Args('userId', { type: () => String }) userId: string,
    ) {
        return await this.transcriptService.userGetOwnTranscript(userId);
    }
}
