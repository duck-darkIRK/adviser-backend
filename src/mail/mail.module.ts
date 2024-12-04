import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity, MailEntity, PostEntity, UserEntity } from '../types';
import { MailResolver } from './mail.resolver';

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
    providers: [MailService, MailResolver],
    exports: [TypeOrmModule, MailService],
})
export class MailModule {}
