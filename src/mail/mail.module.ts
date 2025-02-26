import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
    CommentEntity,
    MailEntity,
    NotificationEntity,
    PostEntity,
    UserEntity,
} from '../types';
import { MailResolver } from './mail.resolver';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            MailEntity,
            UserEntity,
            PostEntity,
            CommentEntity,
            NotificationEntity,
        ]),
    ],
    controllers: [],
    providers: [MailService, MailResolver],
    exports: [TypeOrmModule, MailService],
})
export class MailModule {}
