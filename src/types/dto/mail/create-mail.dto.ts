import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { Comment, Mail, Post, User } from '../../index';

export class CreateMailDto {
    @IsOptional()
    @IsString()
    type: 'default' | 'student' | 'all';

    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    content: string;

    @IsNotEmpty()
    @Type(() => User)
    sender: User;

    @IsOptional()
    @Type(() => User)
    receiver: User;

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
