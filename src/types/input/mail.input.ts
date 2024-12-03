import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateUserInput, UpdateUserInput } from './user.input';
import { CreatePostInput, UpdatePostInput } from './post.input';
import { CreateCommentInput, UpdateCommentInput } from './comment.input';

@InputType()
export class CreateMailInput {
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

    @Field(() => CreateUserInput)
    @IsNotEmpty()
    @Type(() => CreateUserInput)
    sender: CreateUserInput;

    @Field(() => CreateUserInput)
    @IsNotEmpty()
    @Type(() => CreateUserInput)
    receiver: CreateUserInput;

    @Field(() => CreateMailInput, { nullable: true })
    @IsOptional()
    @Type(() => CreateMailInput)
    replyToMail?: CreateMailInput;

    @Field(() => CreatePostInput, { nullable: true })
    @IsOptional()
    @Type(() => CreatePostInput)
    replyToPost?: CreatePostInput;

    @Field(() => CreateCommentInput, { nullable: true })
    @IsOptional()
    @Type(() => CreateCommentInput)
    replyToCmt?: CreateCommentInput;
}

@InputType()
export class UpdateMailInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    id: string; // Assuming id is a string, update as needed

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    type?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    name?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    content?: string;

    @Field(() => UpdateUserInput, { nullable: true })
    @IsOptional()
    @Type(() => UpdateUserInput)
    sender?: UpdateUserInput;

    @Field(() => UpdateUserInput, { nullable: true })
    @IsOptional()
    @Type(() => UpdateUserInput)
    receiver?: UpdateUserInput;

    @Field(() => UpdateMailInput, { nullable: true })
    @IsOptional()
    @Type(() => UpdateMailInput)
    replyToMail?: UpdateMailInput;

    @Field(() => UpdatePostInput, { nullable: true })
    @IsOptional()
    @Type(() => UpdatePostInput)
    replyToPost?: UpdatePostInput;

    @Field(() => UpdateCommentInput, { nullable: true })
    @IsOptional()
    @Type(() => UpdateCommentInput)
    replyToCmt?: UpdateCommentInput;
}

@InputType()
export class SearchMailInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    id: string; // Assuming id is a string, update as needed
}
