import { Field, InputType } from '@nestjs/graphql';
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

@InputType()
export class CreateUserDto {
    @Field({ nullable: true })
    @IsString()
    idPrefix?: string;

    @Field()
    @IsNotEmpty()
    @IsNumber()
    code: number;

    @Field({ nullable: true })
    @IsBoolean()
    @IsOptional()
    isBaned?: boolean;

    @Field()
    @IsString()
    firstName: string;

    @Field()
    @IsString()
    lastName: string;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    avatar?: string;

    @Field({ nullable: true })
    @IsDate()
    @IsOptional()
    birthdate: Date;

    @Field({ nullable: true })
    @IsEmail()
    @IsOptional()
    email?: string;

    @Field(() => [String])
    @IsArray()
    @ArrayNotEmpty()
    @ArrayMinSize(1)
    @IsIn(['admin', 'teacher', 'student', 'superAdmin'], { each: true })
    roles: ('admin' | 'teacher' | 'student' | 'superAdmin')[];

    @Field({ nullable: true })
    @IsString()
    username?: string;

    @Field()
    @IsString()
    password: string;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    refresh_token: string;

    @Field({ nullable: true })
    createdAt?: Date;

    @Field({ nullable: true })
    updatedAt?: Date;

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

    @Field(() => Mailbox)
    @Type(() => Mailbox)
    mail: Mailbox;

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
