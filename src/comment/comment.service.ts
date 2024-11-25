import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    CommentEntity,
    CreateCommentDto,
    MailEntity,
    PostEntity,
    UpdateCommentDto,
    UserEntity,
} from '../types';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(PostEntity)
        private readonly postRepository: Repository<PostEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(MailEntity)
        private readonly mailRepository: Repository<MailEntity>,
        @InjectRepository(CommentEntity)
        private readonly commentRepository: Repository<CommentEntity>,
        @InjectRepository(UserEntity)
        private readonly userEntity: Repository<UserEntity>,
    ) {}

    create(createCommentDto: CreateCommentDto) {
        return 'This action adds a new comment';
    }

    async findAll() {
        return await this.commentRepository
            .createQueryBuilder('comments')
            .getMany();
    }

    async findOne(id: number) {
        return await this.commentRepository
            .createQueryBuilder('comment')
            .where('comment.id = :id', { id })
            .getOne();
    }

    update(id: number, updateCommentDto: UpdateCommentDto) {
        return `This action updates a #${id} comment`;
    }
}
