// post.input.ts
import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { CommentInput } from './comment.input'; // Giả sử bạn đã có CommentInput
import { UserInput } from './user.input'; // Giả sử bạn đã có UserInput
import { MailInput } from './mail.input'; // Giả sử bạn đã có MailInput

@InputType()
export class PostInput {
    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    title?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    content?: string;

    @Field(() => [String], { nullable: 'items' })
    @IsOptional()
    @IsArray()
    image?: string[];

    @Field(() => [CommentInput], { nullable: true })
    @IsOptional()
    @Type(() => CommentInput)
    comments?: CommentInput[];

    @Field(() => [UserInput], { nullable: true })
    @IsOptional()
    @Type(() => UserInput)
    likes?: UserInput[];

    @Field(() => UserInput)
    @Type(() => UserInput)
    user: UserInput;

    @Field(() => [UserInput], { nullable: true })
    @IsOptional()
    @Type(() => UserInput)
    reader?: UserInput[];

    @Field(() => [MailInput], { nullable: true })
    @IsOptional()
    @Type(() => MailInput)
    reply?: MailInput[];

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}
