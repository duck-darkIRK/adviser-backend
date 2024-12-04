import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { CommentEntity, CreateCommentDto, UpdateCommentDto } from '../types';
import { ParseIntPipe } from '@nestjs/common';

@Resolver(() => CommentEntity)
export class CommentResolver {
    constructor(private readonly commentService: CommentService) {}

    @Mutation(() => CommentEntity)
    async createComment(
        @Args('createCommentDto') createCommentDto: CreateCommentDto,
    ): Promise<CommentEntity> {
        return this.commentService.create(createCommentDto);
    }

    @Query(() => [CommentEntity], { name: 'findAllComments' })
    async findAll(): Promise<CommentEntity[]> {
        return this.commentService.findAll();
    }

    @Query(() => CommentEntity, { name: 'findOneComment' })
    async findOne(
        @Args('id', ParseIntPipe) id: number,
    ): Promise<CommentEntity> {
        return this.commentService.findOne(id);
    }

    @Mutation(() => String)
    async updateComment(
        @Args('id', ParseIntPipe) id: number,
        @Args('updateCommentDto') updateCommentDto: UpdateCommentDto,
    ) {
        return this.commentService.update(id, updateCommentDto);
    }
}
