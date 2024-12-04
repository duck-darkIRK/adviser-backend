import { Injectable } from '@nestjs/common';
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
        private readonly postRepository: Repository<PostEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(MailEntity)
        private readonly mailRepository: Repository<MailEntity>,
        @InjectRepository(CommentEntity)
        private readonly commentRepository: Repository<CommentEntity>,
    ) {}

    async create(createPostDto: CreatePostDto) {
        const newPost = this.postRepository.create(createPostDto);
        return await this.postRepository.save(newPost);
    }

    async findAll(count?: number, index: number = 0) {
        return await this.postRepository.find({
            take: count,
            skip: index,
        });
    }

    async findOne(id: number) {
        return await this.postRepository.findOne({
            where: { Id: id },
            relations: ['comments', 'likes', 'user', 'reader', 'reply'],
        });
    }

    async update(id: number, updatePostDto: UpdatePostDto) {
        await this.postRepository.update(id, updatePostDto);
        return await this.postRepository.findOne({ where: { Id: id } });
    }
}
