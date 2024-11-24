import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { Comment, Mail, Post, User } from '../../index';

@InputType()
export class UpdateMailDto {
    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    type: 'default' | 'student' | 'all';

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    name?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    content?: string;

    @Field(() => User, { nullable: true })
    @IsOptional()
    @Type(() => User)
    receiver?: User;

    @Field(() => Mail, { nullable: true })
    @IsOptional()
    @Type(() => Mail)
    replyToMail?: Mail;

    @Field(() => Post, { nullable: true })
    @IsOptional()
    @Type(() => Post)
    replyToPost?: Post;

    @Field(() => Comment, { nullable: true })
    @IsOptional()
    @Type(() => Comment)
    replyToCmt?: Comment;
}
