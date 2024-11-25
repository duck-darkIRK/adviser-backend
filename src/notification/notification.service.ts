import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    CommentEntity,
    CreateNotificationDto,
    MailEntity,
    NotificationEntity,
    UpdateNotificationDto,
    UserEntity,
} from '../types';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationService {
    constructor(
        @InjectRepository(NotificationEntity)
        private readonly notificationRepository: Repository<NotificationEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(MailEntity)
        private readonly postRepository: Repository<MailEntity>,
        @InjectRepository(CommentEntity)
        private readonly commentRepository: Repository<CommentEntity>,
    ) {}

    create(createNotificationDto: CreateNotificationDto) {
        return 'This action adds a new notification';
    }

    async findAll() {
        return await this.notificationRepository.createQueryBuilder().getMany();
    }

    async findOne(id: number) {
        return await this.notificationRepository
            .createQueryBuilder('notification')
            .where('notification.id = :id', { id })
            .getOne();
    }

    update(id: number, updateNotificationDto: UpdateNotificationDto) {
        return `This action updates a #${id} notification`;
    }

    async remove(id: number) {
        return await this.notificationRepository
            .createQueryBuilder('notification')
            .update()
            .set({ isDeleted: true })
            .where('notification.id = :id', { id })
            .execute();
    }

    async pin(id: number) {
        return await this.notificationRepository
            .createQueryBuilder('notification')
            .update()
            .set({ isPin: true })
            .where('notification.id = :id', { id })
            .execute();
    }

    async read(id: number) {
        return await this.notificationRepository
            .createQueryBuilder('notification')
            .update()
            .set({ isRead: true })
            .where('notification.id = :id', { id })
            .execute();
    }
}
