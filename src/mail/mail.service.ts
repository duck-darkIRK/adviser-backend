import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    CommentEntity,
    CreateMailDto,
    MailEntity,
    PostEntity,
    UpdateMailDto,
    UserEntity,
} from '../types';
import { Repository } from 'typeorm';

@Injectable()
export class MailService {
    constructor(
        @InjectRepository(MailEntity)
        private readonly mailRepository: Repository<MailEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(PostEntity)
        private readonly postRepository: Repository<PostEntity>,
        @InjectRepository(CommentEntity)
        private readonly commentRepository: Repository<CommentEntity>,
    ) {}

    async create(createMailDto: CreateMailDto) {
        const {
            sender,
            receiver,
            replyToMail,
            replyToCmt,
            replyToPost,
            ...dto
        } = createMailDto;
        const newMail = this.mailRepository.create(dto);
        if (sender) {
            const user = await this.userRepository.findOne({
                where: { Id: sender },
            });
            if (user) {
                newMail.sender = user;
            } else {
                throw new NotFoundException(`User with ID ${sender} not found`);
            }
        }
        if (receiver) {
            const user = await this.userRepository.findOne({
                where: { Id: receiver },
            });
            if (user) {
                newMail.receiver = user;
            } else {
                throw new NotFoundException(
                    `User with ID ${receiver} not found`,
                );
            }
        }
        if (replyToMail) {
            const mail = await this.mailRepository.findOne({
                where: { Id: replyToMail },
            });
            if (mail) {
                newMail.replyToMail = mail;
            } else {
                throw new NotFoundException(
                    `Mail with ID ${replyToMail} not found`,
                );
            }
        }
        if (replyToCmt) {
            const cmt = await this.commentRepository.findOne({
                where: { Id: replyToCmt },
            });
            if (cmt) {
                newMail.replyToCmt = cmt;
            } else {
                throw new NotFoundException(
                    `Comment with ID ${replyToCmt} not found`,
                );
            }
        }
        if (replyToPost) {
            const post = await this.postRepository.findOne({
                where: { Id: replyToPost },
            });
            if (post) {
                newMail.replyToPost = post;
            } else {
                throw new NotFoundException(
                    `Post with ID ${replyToPost} not found`,
                );
            }
        }
        return await this.mailRepository.save(newMail);
    }

    async findAll(count?: number, index: number = 0) {
        return await this.mailRepository.find({
            take: count,
            skip: index,
        });
    }

    async findOne(id: number) {
        return await this.mailRepository.findOne({
            where: { Id: id },
            relations: [
                'sender',
                'receiver',
                'replyToMail',
                'replyToPost',
                'replyToCmt',
            ],
        });
    }

    async update(id: number, updateMailDto: UpdateMailDto) {
        await this.mailRepository.update(id, updateMailDto);
        return this.mailRepository.findOne({ where: { Id: id } });
    }
}
