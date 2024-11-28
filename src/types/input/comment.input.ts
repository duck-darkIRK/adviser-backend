// comment.input.ts
import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { UserInput } from './user.input';
import { PostInput } from './post.input';
import { MailInput } from './mail.input';

@InputType()
export class CommentInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    content: string;

    @Field(() => UserInput)
    @IsNotEmpty()
    @Type(() => UserInput)
    user: UserInput;

    @Field(() => PostInput, { nullable: true })
    @IsOptional()
    @Type(() => PostInput)
    post?: PostInput;

    @Field(() => CommentInput, { nullable: true })
    @IsOptional()
    @Type(() => CommentInput)
    reply?: CommentInput;

    @Field(() => [CommentInput], { nullable: true })
    @IsOptional()
    @Type(() => CommentInput)
    replies?: CommentInput[];

    @Field(() => [UserInput], { nullable: true })
    @IsOptional()
    @Type(() => UserInput)
    likes?: UserInput[];

    @Field(() => [MailInput], { nullable: true })
    @IsOptional()
    @Type(() => MailInput)
    replyMail?: MailInput[];

    @Field()
    @IsNotEmpty()
    createdAt: Date;

    @Field()
    @IsNotEmpty()
    updatedAt: Date;
}
