import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity, MailEntity, PostEntity, UserEntity } from '../types';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            MailEntity,
            UserEntity,
            PostEntity,
            CommentEntity,
        ]),
    ],
    controllers: [MailController],
    providers: [MailService],
    exports: [TypeOrmModule, MailService],
})
export class MailModule {}
