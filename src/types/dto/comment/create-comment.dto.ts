import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { Comment, Mail, Post, User } from '../../index';

export class CreateCommentDto {
    @IsNotEmpty()
    @IsString()
    content: string;

    @IsNotEmpty()
    @Type(() => User)
    user: User;

    @IsOptional()
    @Type(() => Post)
    post?: Post;

    @IsOptional()
    @Type(() => Comment)
    reply?: Comment;

    @IsOptional()
    @Type(() => Comment)
    replies?: Comment[];

    @IsOptional()
    @Type(() => User)
    likes?: User[];

    @IsOptional()
    @Type(() => Mail)
    replyMail?: Mail[];
}
