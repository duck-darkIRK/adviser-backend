import { IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { Comment, Mail, User } from '../../index';

export class UpdateCommentDto {
    @IsOptional()
    @IsString()
    content?: string;

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
