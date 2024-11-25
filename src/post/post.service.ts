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

    create(createPostDto: CreatePostDto) {
        return 'This action adds a new post';
    }

    async findAll() {
        return await this.postRepository.createQueryBuilder().getMany();
    }

    async findOne(id: number) {
        return await this.postRepository
            .createQueryBuilder('post')
            .where('post.id = :id', { id: id })
            .getOne();
    }

    update(id: number, updatePostDto: UpdatePostDto) {
        return `This action updates a #${id} post`;
    }
}
