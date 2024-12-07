import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity, MailEntity, PostEntity, UserEntity } from '../types';
import { CommentResolver } from './comment.resolver';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            CommentEntity,
            PostEntity,
            CommentEntity,
            MailEntity,
            UserEntity,
        ]),
    ],
    controllers: [],
    providers: [CommentService, CommentResolver],
    exports: [TypeOrmModule, CommentService],
})
export class CommentModule {}
