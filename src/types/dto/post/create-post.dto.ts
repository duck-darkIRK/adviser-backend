import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { Comment, Mail, User } from '../../index';

export class CreatePostDto {
    @IsOptional()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    content: string;

    @IsArray()
    @IsOptional()
    image?: string[];

    @IsNotEmpty()
    @Type(() => User)
    user: User;

    @IsArray()
    @IsOptional()
    @Type(() => User)
    reader?: User[];

    @IsOptional()
    @Type(() => Comment)
    comments?: Comment[];

    @IsOptional()
    @Type(() => User)
    likes?: User[];

    @IsOptional()
    @Type(() => Mail)
    reply?: Mail[];
}
