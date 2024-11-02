import {
    ArrayMinSize,
    ArrayNotEmpty,
    IsArray,
    IsBoolean,
    IsDate,
    IsEmail,
    IsIn,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Class, Mailbox, Major, Notification, Post } from '../../index';

export class CreateUserDto {
    @IsString()
    idPrefix?: string;

    @IsNotEmpty()
    @IsNumber()
    code: number;

    @IsBoolean()
    @IsOptional()
    isBaned?: boolean;

    @IsString()
    firstName: string;

    @IsString()
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

    @IsArray()
    @ArrayNotEmpty()
    @ArrayMinSize(1)
    @IsIn(['admin', 'teacher', 'student', 'superAdmin'], {
        each: true,
    })
    roles: ('admin' | 'teacher' | 'student' | 'superAdmin')[];

    @IsString()
    username?: string;

    @IsString()
    password: string;

    @IsString()
    @IsOptional()
    refresh_token: string;

    createdAt?: Date;

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
