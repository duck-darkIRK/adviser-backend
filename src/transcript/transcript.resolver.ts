import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TranscriptService } from './transcript.service';
import {
    CreateTranscriptDto,
    TranscriptEntity,
    UpdateTranscriptDto,
} from '../types';
import { ParseIntPipe } from '@nestjs/common';

@Resolver(() => TranscriptEntity)
export class TranscriptResolver {
    constructor(private readonly transcriptService: TranscriptService) {}

    @Mutation(() => TranscriptEntity)
    async createTranscript(
        @Args('createTranscriptDto') createTranscriptDto: CreateTranscriptDto,
    ) {
        return await this.transcriptService.create(createTranscriptDto);
    }

    @Query(() => [TranscriptEntity], { name: 'findAllTranscripts' })
    async findAllTranscripts(
        @Args('count', ParseIntPipe) count?: number,
        @Args('index', ParseIntPipe) index?: number,
    ) {
        return await this.transcriptService.findAll(count, index);
    }

    @Query(() => TranscriptEntity, { name: 'findOneTranscript' })
    async findOneTranscript(@Args('id', ParseIntPipe) id: number) {
        return await this.transcriptService.findOne(id);
    }

    @Mutation(() => TranscriptEntity)
    async updateTranscript(
        @Args('id', ParseIntPipe) id: number,
        @Args('updateTranscriptDto') updateTranscriptDto: UpdateTranscriptDto,
    ) {
        return await this.transcriptService.update(id, updateTranscriptDto);
    }
}
