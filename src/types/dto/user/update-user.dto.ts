import {
    IsArray,
    IsBoolean,
    IsDate,
    IsEmail,
    IsOptional,
    IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Class, Mailbox, Major, Notification, Post } from '../../index';

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    idPrefix?: string;

    @IsBoolean()
    @IsOptional()
    isBaned?: boolean;

    @IsString()
    @IsOptional()
    firstName: string;

    @IsString()
    @IsOptional()
    lastName: string;

    @IsString()
    @IsOptional()
    avatar?: string;

    @IsDate()
    @IsOptional()
    birthdate: Date;

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    role: 'admin' | 'teacher' | 'student' | 'superAdmin';

    @IsString()
    @IsOptional()
    username?: string;

    @IsString()
    @IsOptional()
    password: string;

    @IsString()
    refresh_token: string;

    updatedAt?: Date;

    @IsArray()
    @Type(() => Major)
    @IsOptional()
    majors?: Major[];

    @IsArray()
    @Type(() => Post)
    @IsOptional()
    readPosts?: Post[];

    @Type(() => Mailbox)
    mail: Mailbox;

    @IsArray()
    @Type(() => Notification)
    @IsOptional()
    notifications?: Notification[];

    @IsArray()
    @Type(() => Post)
    @IsOptional()
    likedPosts?: Post[];

    @IsArray()
    @Type(() => Class)
    @IsOptional()
    classes?: Class[];

    @IsArray()
    @Type(() => Class)
    @IsOptional()
    teach?: Class[];
}
