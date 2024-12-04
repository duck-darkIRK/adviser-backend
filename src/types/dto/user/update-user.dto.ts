import { Field, InputType } from '@nestjs/graphql';
import {
    ArrayMinSize,
    ArrayNotEmpty,
    IsArray,
    IsBoolean,
    IsDate,
    IsEmail,
    IsIn,
    IsOptional,
    IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Class, Major, Notification, Post } from '../../index';

@InputType()
export class UpdateUserDto {
    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    idPrefix?: string;

    @Field({ nullable: true })
    @IsBoolean()
    @IsOptional()
    isBaned?: boolean;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    firstName?: string;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    lastName?: string;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    avatar?: string;

    @Field({ nullable: true })
    @IsDate()
    @IsOptional()
    birthdate?: Date;

    @Field({ nullable: true })
    @IsEmail()
    @IsOptional()
    email?: string;

    @Field(() => [String], { nullable: true })
    @IsArray()
    @ArrayNotEmpty()
    @ArrayMinSize(1)
    @IsIn(['admin', 'teacher', 'student', 'superAdmin'], { each: true })
    roles: ('admin' | 'teacher' | 'student' | 'superAdmin')[];

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    username?: string;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    password?: string;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    refresh_token?: string;

    @Field(() => [Major], { nullable: true })
    @IsArray()
    @Type(() => Major)
    @IsOptional()
    majors?: Major[];

    @Field(() => [Post], { nullable: true })
    @IsArray()
    @Type(() => Post)
    @IsOptional()
    readPosts?: Post[];

    @Field(() => [Notification], { nullable: true })
    @IsArray()
    @Type(() => Notification)
    @IsOptional()
    notifications?: Notification[];

    @Field(() => [Post], { nullable: true })
    @IsArray()
    @Type(() => Post)
    @IsOptional()
    likedPosts?: Post[];

    @Field(() => [Class], { nullable: true })
    @IsArray()
    @Type(() => Class)
    @IsOptional()
    classes?: Class[];

    @Field(() => [Class], { nullable: true })
    @IsArray()
    @Type(() => Class)
    @IsOptional()
    teach?: Class[];
}
