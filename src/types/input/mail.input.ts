// mail.input.ts
import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { UserInput } from './user.input';
import { PostInput } from './post.input';
import { CommentInput } from './comment.input';

@InputType()
export class MailInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    type: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    name: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    content: string;

    @Field(() => UserInput)
    @IsNotEmpty()
    @Type(() => UserInput)
    sender: UserInput;

    @Field(() => UserInput)
    @IsNotEmpty()
    @Type(() => UserInput)
    receiver: UserInput;

    @Field(() => MailInput, { nullable: true })
    @IsOptional()
    @Type(() => MailInput)
    replyToMail?: MailInput;

    @Field(() => PostInput, { nullable: true })
    @IsOptional()
    @Type(() => PostInput)
    replyToPost?: PostInput;

    @Field(() => CommentInput, { nullable: true })
    @IsOptional()
    @Type(() => CommentInput)
    replyToCmt?: CommentInput;

    @Field()
    @IsNotEmpty()
    createdAt: Date;

    @Field()
    @IsNotEmpty()
    updatedAt: Date;
}
