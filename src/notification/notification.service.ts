import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationEntity } from '../types';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationService {
    constructor(
        @InjectRepository(NotificationEntity)
        private readonly NotificationRepository: Repository<NotificationEntity>,
    ) {}

    async userGetNotification(
        userId: string,
        count?: number,
        index: number = 0,
    ) {
        return await this.NotificationRepository.find({
            where: { user: { Id: userId }, isRead: false },
            relations: ['comment', 'mail'],
            order: { createdAt: 'DESC' },
            take: count,
            skip: index,
        });
    }

    async userReadNotification(id: number) {
        return await this.NotificationRepository.createQueryBuilder()
            .update()
            .set({ isRead: true })
            .where('Id = :id', { id })
            .execute();
    }
}
