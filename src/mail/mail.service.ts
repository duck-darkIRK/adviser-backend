import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    CommentEntity,
    CreateMailDto,
    MailEntity,
    NotificationEntity,
    PostEntity,
    UpdateMailDto,
    UserEntity,
} from '../types';
import { Repository } from 'typeorm';

@Injectable()
export class MailService {
    constructor(
        @InjectRepository(MailEntity)
        private readonly MailRepository: Repository<MailEntity>,
        @InjectRepository(UserEntity)
        private readonly UserRepository: Repository<UserEntity>,
        @InjectRepository(PostEntity)
        private readonly PostRepository: Repository<PostEntity>,
        @InjectRepository(CommentEntity)
        private readonly CommentRepository: Repository<CommentEntity>,
        @InjectRepository(NotificationEntity)
        private readonly NotificationRepository: Repository<NotificationEntity>,
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
        const noti = this.NotificationRepository.create();
        const newMail = this.MailRepository.create(dto);
        if (sender) {
            const user = await this.UserRepository.findOne({
                where: { Id: sender },
            });
            if (user) {
                newMail.sender = user;
            } else {
                throw new NotFoundException(`User with ID ${sender} not found`);
            }
        }
        if (receiver) {
            const user = await this.UserRepository.findOne({
                where: { Id: receiver },
            });
            if (user) {
                newMail.receiver = user;
                noti.user = user;
            } else {
                throw new NotFoundException(
                    `User with ID ${receiver} not found`,
                );
            }
        }
        if (replyToMail) {
            const mail = await this.MailRepository.findOne({
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
            const cmt = await this.CommentRepository.findOne({
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
            const post = await this.PostRepository.findOne({
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
        await this.MailRepository.save(newMail);
        noti.mail = newMail;
        await this.NotificationRepository.save(noti);
        return newMail;
    }

    async findAll(count?: number, index: number = 0) {
        return await this.MailRepository.find({
            take: count,
            skip: index,
        });
    }

    async findOne(id: number) {
        return await this.MailRepository.findOne({
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
        await this.MailRepository.update(id, updateMailDto);
        return this.MailRepository.findOne({ where: { Id: id } });
    }

    async userGetOwnSendMail(
        userId: string,
        count?: number,
        index: number = 0,
    ) {
        return await this.MailRepository.find({
            where: { sender: { Id: userId } },
            relations: ['receiver', 'replyToMail', 'replyToPost', 'replyToCmt'],
            order: { createdAt: 'DESC' },
            take: count,
            skip: index,
        });
    }

    async userGetOwnReceiveMail(
        userId: string,
        count?: number,
        index: number = 0,
    ) {
        return await this.MailRepository.find({
            where: { receiver: { Id: userId } },
            relations: ['sender', 'replyToMail', 'replyToPost', 'replyToCmt'],
            order: { createdAt: 'DESC' },
            take: count,
            skip: index,
        });
    }
}
