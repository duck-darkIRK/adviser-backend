import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostService } from './post.service';
import { CreatePostDto, PostEntity, UpdatePostDto } from '../types';
import { UseGuards } from '@nestjs/common';
import { GqlRolesGuard } from '../auth/gqlRoles.guard';
import { GqlAuthGuard } from '../auth/passport/gql-jwt-auth.guard';
import { Public } from '../decorator/guard.config';
import { GqlCurrentUser } from '../decorator/GqlCurrentUser.decorator';

@UseGuards(GqlRolesGuard)
@UseGuards(GqlAuthGuard)
@Resolver(() => PostEntity)
export class PostResolver {
    constructor(private readonly postService: PostService) {}

    @Mutation(() => PostEntity)
    async createPost(
        @Args('createPostDto') createPostDto: CreatePostDto,
    ): Promise<PostEntity> {
        return this.postService.create(createPostDto);
    }

    @Public()
    @Query(() => [PostEntity], { name: 'getAllPosts' })
    async getPosts(
        @Args('count', { type: () => Int, nullable: true }) count?: number,
        @Args('index', { type: () => Int, nullable: true }) index?: number,
    ): Promise<PostEntity[]> {
        return this.postService.findAll(count, index);
    }

    @Public()
    @Query(() => PostEntity)
    async getPostById(
        @Args('id', { type: () => Int }) id: number,
    ): Promise<PostEntity> {
        return this.postService.findOne(id);
    }

    @Mutation(() => PostEntity)
    async updatePost(
        @Args('id', { type: () => Int }) id: number,
        @Args('updatePostDto') updatePostDto: UpdatePostDto,
    ): Promise<PostEntity> {
        return this.postService.update(id, updatePostDto);
    }

    @Mutation(() => Boolean)
    async addUserLikePost(
        @Args('userId', { type: () => String }) userId: string,
        @Args('postId', { type: () => Int }) postId: number,
    ) {
        await this.postService.addUserLikePost(userId, postId);
        return true;
    }

    @Mutation(() => Boolean)
    async removeUserLikePost(
        @Args('userId', { type: () => String }) userId: string,
        @Args('postId', { type: () => Int }) postId: number,
    ) {
        await this.postService.removeUserLikePost(userId, postId);
        return true;
    }

    @Mutation(() => Boolean)
    async addReaderPost(
        @Args('userId', { type: () => String }) userId: string,
        @Args('postId', { type: () => Int }) postId: number,
    ) {
        await this.postService.addReaderPost(userId, postId);
        return true;
    }

    @Mutation(() => Boolean)
    async addCommentToPost(
        @Args('commentId', { type: () => Int }) commentId: number,
        @Args('postId', { type: () => Int }) postId: number,
    ) {
        await this.postService.addCommentToPost(commentId, postId);
        return true;
    }

    @Mutation(() => PostEntity, { name: 'USER_createPost' })
    async userCreatePost(
        @GqlCurrentUser() owner,
        @Args('createPostDto') createPostDto: CreatePostDto,
    ): Promise<PostEntity> {
        createPostDto.user = owner.Id;
        return await this.postService.create(createPostDto);
    }

    @Mutation(() => PostEntity, { name: 'USER_updatePost' })
    async userUpdatePost(
        @GqlCurrentUser() owner,
        @Args('postId', { type: () => Int }) postId: number,
        @Args('updatePostDto') updatePostDto: UpdatePostDto,
    ): Promise<PostEntity> {
        return await this.postService.userUpdate(
            owner.Id,
            postId,
            updatePostDto,
        );
    }

    @Mutation(() => Boolean, { name: 'USER_likePost' })
    async userLikePost(
        @GqlCurrentUser() owner,
        @Args('postId', { type: () => Int }) postId: number,
    ) {
        await this.postService.userLikePost(owner.Id, postId);
        return true;
    }

    @Mutation(() => Boolean, { name: 'USER_unlikePost' })
    async UserUnlikePost(
        @GqlCurrentUser() owner,
        @Args('postId', { type: () => Int }) postId: number,
    ) {
        await this.postService.userUnlikePost(owner.Id, postId);
        return true;
    }

    @Mutation(() => Boolean, { name: 'USER_readPost' })
    async userReadPost(
        @GqlCurrentUser() owner,
        @Args('postId', { type: () => Int }) postId: number,
    ) {
        await this.postService.addReaderPost(owner.Id, postId);
        return true;
    }
}
