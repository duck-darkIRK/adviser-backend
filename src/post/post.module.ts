import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity, MailEntity, PostEntity, UserEntity } from '../types';
import { PostResolver } from './post.resolver';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            PostEntity,
            CommentEntity,
            UserEntity,
            MailEntity,
        ]),
    ],
    controllers: [],
    providers: [PostService, PostResolver],
    exports: [TypeOrmModule, PostService],
})
export class PostModule {}
