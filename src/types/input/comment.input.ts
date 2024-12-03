import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateUserInput, UpdateUserInput } from './user.input';
import { CreatePostInput, UpdatePostInput } from './post.input';
import { CreateMailInput, UpdateMailInput } from './mail.input';

@InputType()
export class CreateCommentInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    content: string;

    @Field(() => CreateUserInput)
    @IsNotEmpty()
    @Type(() => CreateUserInput)
    user: CreateUserInput;

    @Field(() => CreatePostInput, { nullable: true })
    @IsOptional()
    @Type(() => CreatePostInput)
    post?: CreatePostInput;

    @Field(() => CreateCommentInput, { nullable: true })
    @IsOptional()
    @Type(() => CreateCommentInput)
    reply?: CreateCommentInput;

    @Field(() => [CreateCommentInput], { nullable: true })
    @IsOptional()
    @Type(() => CreateCommentInput)
    replies?: CreateCommentInput[];

    @Field(() => [CreateUserInput], { nullable: true })
    @IsOptional()
    @Type(() => CreateUserInput)
    likes?: CreateUserInput[];

    @Field(() => [CreateMailInput], { nullable: true })
    @IsOptional()
    @Type(() => CreateMailInput)
    replyMail?: CreateMailInput[];
}

@InputType()
export class UpdateCommentInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    id: string; // Assuming id is a string, update as needed

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    content?: string;

    @Field(() => UpdateUserInput, { nullable: true })
    @IsOptional()
    @Type(() => UpdateUserInput)
    user?: UpdateUserInput;

    @Field(() => UpdatePostInput, { nullable: true })
    @IsOptional()
    @Type(() => UpdatePostInput)
    post?: UpdatePostInput;

    @Field(() => UpdateCommentInput, { nullable: true })
    @IsOptional()
    @Type(() => UpdateCommentInput)
    reply?: UpdateCommentInput;

    @Field(() => [UpdateCommentInput], { nullable: true })
    @IsOptional()
    @Type(() => UpdateCommentInput)
    replies?: UpdateCommentInput[];

    @Field(() => [UpdateUserInput], { nullable: true })
    @IsOptional()
    @Type(() => UpdateUserInput)
    likes?: UpdateUserInput[];

    @Field(() => [UpdateMailInput], { nullable: true })
    @IsOptional()
    @Type(() => UpdateMailInput)
    replyMail?: UpdateMailInput[];
}

@InputType()
export class SearchCommentInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    id: string; // Assuming id is a string, update as needed
}
