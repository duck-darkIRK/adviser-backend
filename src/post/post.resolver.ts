import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostService } from './post.service';
import { CreatePostDto, PostEntity, UpdatePostDto } from '../types';
import { ParseIntPipe } from '@nestjs/common';

@Resolver(() => PostEntity)
export class PostResolver {
    constructor(private readonly postService: PostService) {}

    @Mutation(() => PostEntity)
    async createPost(
        @Args('createPostDto') createPostDto: CreatePostDto,
    ): Promise<PostEntity> {
        return this.postService.create(createPostDto);
    }

    @Query(() => [PostEntity])
    async getPosts(
        @Args('count', ParseIntPipe) count?: number,
        @Args('index', ParseIntPipe) index?: number,
    ): Promise<PostEntity[]> {
        return this.postService.findAll(count, index);
    }

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
}
