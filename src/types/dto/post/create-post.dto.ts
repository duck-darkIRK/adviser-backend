import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { Comment, Mail, User } from '../../index';

@InputType()
export class CreatePostDto {
    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    title?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    content?: string;

    @Field(() => [String], { nullable: 'itemsAndList' })
    @IsOptional()
    @IsArray()
    image?: string[];

    @Field(() => User)
    @IsNotEmpty()
    @Type(() => User)
    user: User;

    @Field(() => [User], { nullable: 'itemsAndList' })
    @IsOptional()
    @IsArray()
    @Type(() => User)
    reader?: User[];

    @Field(() => [Comment], { nullable: 'itemsAndList' })
    @IsOptional()
    @Type(() => Comment)
    comments?: Comment[];

    @Field(() => [User], { nullable: 'itemsAndList' })
    @IsOptional()
    @Type(() => User)
    likes?: User[];

    @Field(() => [Mail], { nullable: 'itemsAndList' })
    @IsOptional()
    @Type(() => Mail)
    reply?: Mail[];
}
