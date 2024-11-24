import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { Comment, Mail, Post, User } from '../../index';

@InputType()
export class CreateCommentDto {
    @Field()
    @IsNotEmpty()
    @IsString()
    content: string;

    @Field(() => User)
    @IsNotEmpty()
    @Type(() => User)
    user: User;

    @Field(() => Post, { nullable: true })
    @IsOptional()
    @Type(() => Post)
    post?: Post;

    @Field(() => Comment, { nullable: true })
    @IsOptional()
    @Type(() => Comment)
    reply?: Comment;

    @Field(() => [Comment], { nullable: true })
    @IsOptional()
    @Type(() => Comment)
    replies?: Comment[];

    @Field(() => [User], { nullable: true })
    @IsOptional()
    @Type(() => User)
    likes?: User[];

    @Field(() => [Mail], { nullable: true })
    @IsOptional()
    @Type(() => Mail)
    replyMail?: Mail[];
}
