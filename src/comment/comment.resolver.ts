import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { CommentEntity, CreateCommentDto, UpdateCommentDto } from '../types';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Roles } from '../decorator/roles.decorator';
import { Role } from '../auth/role.enum';
import { GqlRolesGuard } from '../auth/gqlRoles.guard';
import { GqlAuthGuard } from '../auth/passport/gql-jwt-auth.guard';
import { GqlCurrentUser } from '../decorator/GqlCurrentUser.decorator';

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

    @Roles(Role.Admin)
    @Query(() => [CommentEntity], { name: 'getAllComments' })
    async findAll(): Promise<CommentEntity[]> {
        return this.commentService.findAll();
    }

    @Roles(Role.Admin)
    @Query(() => CommentEntity, { name: 'getCommentById' })
    async findOne(
        @Args('id', { type: () => Int }, ParseIntPipe) id: number,
    ): Promise<CommentEntity> {
        return this.commentService.findOne(id);
    }

    @Mutation(() => CommentEntity)
    async updateComment(
        @Args('id', { type: () => Int }, ParseIntPipe) id: number,
        @Args('updateCommentDto') updateCommentDto: UpdateCommentDto,
    ) {
        return this.commentService.update(id, updateCommentDto);
    }

    @Roles(Role.Admin, Role.Teacher, Role.Student)
    @Mutation(() => CommentEntity, { name: 'USER_commentOnPost' })
    async userComment(
        @GqlCurrentUser() owner,
        @Args('postId', { type: () => Int }, ParseIntPipe) postId: number,
        @Args('createCommentDto') createCommentDto: CreateCommentDto,
    ): Promise<CommentEntity> {
        createCommentDto.user = owner.Id;
        createCommentDto.post = postId;
        return this.commentService.create(createCommentDto);
    }

    @Roles(Role.Admin, Role.Teacher, Role.Student)
    @Mutation(() => CommentEntity, { name: 'USER_commentOnComment' })
    async userCommentOnComment(
        @GqlCurrentUser() owner,
        @Args('commentId', { type: () => Int }, ParseIntPipe) commentId: number,
        @Args('createCommentDto') createCommentDto: CreateCommentDto,
    ): Promise<CommentEntity> {
        createCommentDto.user = owner.Id;
        createCommentDto.reply = commentId;
        return this.commentService.create(createCommentDto);
    }

    @Roles(Role.Admin, Role.Teacher, Role.Student)
    @Mutation(() => CommentEntity, { name: 'USER_updateComment' })
    async userUpdateComment(
        @GqlCurrentUser() owner,
        @Args('commentId', { type: () => Int }, ParseIntPipe) commentId: number,
        @Args('updateCommentDto') updateCommentDto: UpdateCommentDto,
    ): Promise<CommentEntity> {
        return this.commentService.updateOwnComment(
            owner.Id,
            commentId,
            updateCommentDto,
        );
    }
}
