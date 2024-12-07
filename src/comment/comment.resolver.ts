import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { CommentEntity, CreateCommentDto, UpdateCommentDto } from '../types';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Roles } from '../decorator/roles.decorator';
import { Role } from '../auth/role.enum';
import { GqlRolesGuard } from '../auth/gqlRoles.guard';
import { GqlAuthGuard } from '../auth/passport/gql-jwt-auth.guard';

@Roles(Role.Admin)
@UseGuards(GqlRolesGuard)
@UseGuards(GqlAuthGuard)
@Resolver(() => CommentEntity)
export class CommentResolver {
    constructor(private readonly commentService: CommentService) {}

    @Mutation(() => CommentEntity)
    async createComment(
        @Args('createCommentDto') createCommentDto: CreateCommentDto,
    ): Promise<CommentEntity> {
        return this.commentService.create(createCommentDto);
    }

    @Query(() => [CommentEntity], { name: 'getAllComments' })
    async findAll(): Promise<CommentEntity[]> {
        return this.commentService.findAll();
    }

    @Query(() => CommentEntity, { name: 'getCommentById' })
    async findOne(
        @Args('id', ParseIntPipe) id: number,
    ): Promise<CommentEntity> {
        return this.commentService.findOne(id);
    }

    @Mutation(() => CommentEntity)
    async updateComment(
        @Args('id', ParseIntPipe) id: number,
        @Args('updateCommentDto') updateCommentDto: UpdateCommentDto,
    ) {
        return this.commentService.update(id, updateCommentDto);
    }
}
