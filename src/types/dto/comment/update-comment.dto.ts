import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { Comment, Mail, User } from '../../index';

@InputType()
export class UpdateCommentDto {
    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    content?: string;

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
