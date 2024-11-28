import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
    CommentEntity,
    MailEntity,
    NotificationEntity,
    UserEntity,
} from '../types';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            NotificationEntity,
            CommentEntity,
            UserEntity,
            MailEntity,
        ]),
    ],
    controllers: [NotificationController],
    providers: [NotificationService],
    exports: [TypeOrmModule, NotificationService],
})
export class NotificationModule {}
