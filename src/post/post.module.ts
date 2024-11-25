import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity, MailEntity, PostEntity, UserEntity } from '../types';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            PostEntity,
            CommentEntity,
            UserEntity,
            MailEntity,
        ]),
    ],
    controllers: [PostController],
    providers: [PostService],
    exports: [TypeOrmModule],
})
export class PostModule {}
