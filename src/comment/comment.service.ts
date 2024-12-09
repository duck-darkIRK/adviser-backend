import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
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
        private readonly PostRepository: Repository<PostEntity>,
        @InjectRepository(UserEntity)
        private readonly UserRepository: Repository<UserEntity>,
        @InjectRepository(MailEntity)
        private readonly MailRepository: Repository<MailEntity>,
        @InjectRepository(CommentEntity)
        private readonly CommentRepository: Repository<CommentEntity>,
    ) {}

    async create(createCommentDto: CreateCommentDto) {
        const { user, post, reply, ...dto } = createCommentDto;
        const newComment = this.CommentRepository.create(dto);
        if (user) {
            const userEntity = await this.UserRepository.findOne({
                where: { Id: user },
            });
            if (userEntity) {
                newComment.user = userEntity;
            } else {
                throw new NotFoundException(`User with Id: ${user} not found.`);
            }
        }
        if (post) {
            const postEntity = await this.PostRepository.findOne({
                where: { Id: post },
            });
            if (postEntity) {
                newComment.post = postEntity;
            } else {
                throw new NotFoundException(`Post with Id: ${post} not found.`);
            }
        }
        if (reply) {
            const cmtEntity = await this.CommentRepository.findOne({
                where: { Id: reply },
            });
            if (cmtEntity) {
                newComment.reply = cmtEntity;
            } else {
                throw new NotFoundException(
                    `Comment with Id: ${reply} not found.`,
                );
            }
        }
        return await this.CommentRepository.save(newComment);
    }

    async findAll(count?: number, index: number = 0) {
        return await this.CommentRepository.find({
            skip: index,
            take: count,
        });
    }

    async findOne(id: number) {
        return await this.CommentRepository.findOne({
            where: { Id: id },
            relations: [
                'post',
                'user',
                'reply',
                'replies',
                'likes',
                'replyMail',
            ],
        });
    }

    async update(id: number, updateCommentDto: UpdateCommentDto) {
        await this.CommentRepository.update(id, updateCommentDto);
        return await this.CommentRepository.findOne({ where: { Id: id } });
    }

    async updateOwnComment(
        userId: string,
        commentId: number,
        updateCommentDto: UpdateCommentDto,
    ) {
        const commentEntity = await this.CommentRepository.findOne({
            where: { Id: commentId },
            relations: { user: true },
        });
        const userEntity = await this.UserRepository.findOne({
            where: { Id: userId },
        });
        if (commentEntity.user == userEntity) {
            return await this.update(commentId, updateCommentDto);
        } else {
            throw new ForbiddenException(
                `This is not your Comment with Id: ${commentId}`,
            );
        }
    }
}
