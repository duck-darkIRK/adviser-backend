import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    CommentEntity,
    CreatePostDto,
    MailEntity,
    PostEntity,
    UpdatePostDto,
    UserEntity,
} from '../types';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(PostEntity)
        private readonly PostRepository: Repository<PostEntity>,
        @InjectRepository(UserEntity)
        private readonly UserRepository: Repository<UserEntity>,
        @InjectRepository(MailEntity)
        private readonly MailRepository: Repository<MailEntity>,
        @InjectRepository(CommentEntity)
        private readonly CommentRepository: Repository<CommentEntity>,
    ) {}

    async create(createPostDto: CreatePostDto) {
        const { user, ...dto } = createPostDto;
        const newPost = this.PostRepository.create(dto);
        if (user) {
            const userEntity = await this.UserRepository.findOne({
                where: { Id: user },
            });
            if (userEntity) {
                newPost.user = userEntity;
            } else {
                throw new NotFoundException(`User with Id: ${user} not found.`);
            }
        }
        return await this.PostRepository.save(newPost);
    }

    async findAll(count?: number, index: number = 0) {
        return await this.PostRepository.find({
            take: count,
            skip: index,
        });
    }

    async findOne(id: number) {
        return await this.PostRepository.findOne({
            where: { Id: id },
            relations: ['comments', 'likes', 'user', 'reader', 'reply'],
        });
    }

    async update(id: number, updatePostDto: UpdatePostDto) {
        await this.PostRepository.update(id, updatePostDto);
        return await this.PostRepository.findOne({ where: { Id: id } });
    }

    async addUserLikePost(userId: string, postId: number) {
        const post = await this.PostRepository.findOne({
            where: { Id: postId },
        });
        if (!post) {
            throw new NotFoundException(`Post with Id: ${postId} not found.`);
        }
        const user = await this.UserRepository.findOne({
            where: { Id: userId },
        });
        if (user) {
            post.likes = [...post.likes, user];
        } else {
            throw new NotFoundException(`User with Id: ${user} not found.`);
        }
        return await this.PostRepository.save(post);
    }

    async removeUserLikePost(userId: string, postId: number) {
        const post = await this.PostRepository.findOne({
            where: { Id: postId },
            relations: { likes: true },
        });
        if (!post) {
            throw new NotFoundException(`Post with Id: ${postId} not found.`);
        }

        const user = await this.UserRepository.findOne({
            where: { Id: userId },
        });
        if (!user) {
            throw new NotFoundException(`User with Id: ${userId} not found.`);
        }

        post.likes = post.likes.filter((like) => like.Id !== userId);

        return await this.PostRepository.save(post);
    }

    async addReaderPost(userId: string, postId: number) {
        const post = await this.PostRepository.findOne({
            where: { Id: postId },
        });
        if (!post) {
            throw new NotFoundException(`Post with Id: ${postId} not found.`);
        }
        const user = await this.UserRepository.findOne({
            where: { Id: userId },
        });
        if (user) {
            post.reader = [...post.reader, user];
        } else {
            throw new NotFoundException(`User with Id: ${user} not found.`);
        }
        return await this.PostRepository.save(post);
    }

    async addCommentToPost(commentId: number, postId: number) {
        const post = await this.PostRepository.findOne({
            where: { Id: postId },
        });
        if (!post) {
            throw new NotFoundException(`Post with Id: ${postId} not found.`);
        }
        const comment = await this.CommentRepository.findOne({
            where: { Id: commentId },
        });
        if (comment) {
            post.comments = [...post.comments, comment];
        } else {
            throw new NotFoundException(
                `Comment with Id: ${commentId} not found.`,
            );
        }
        return await this.PostRepository.save(post);
    }
}
