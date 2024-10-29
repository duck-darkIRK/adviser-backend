import { IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { Comment, Mail, Post, User } from '../../index';

export class UpdateMailDto {
    @IsOptional()
    @IsString()
    type: 'default' | 'student' | 'all';

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    content?: string;

    @IsOptional()
    @Type(() => User)
    receiver?: User;

    @IsOptional()
    @Type(() => Mail)
    replyToMail?: Mail;

    @IsOptional()
    @Type(() => Post)
    replyToPost?: Post;

    @IsOptional()
    @Type(() => Comment)
    replyToCmt?: Comment;
}
