import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateUserInput, UpdateUserInput } from './user.input';
import { CreateCommentInput, UpdateCommentInput } from './comment.input';
import { CreateMailInput, UpdateMailInput } from './mail.input';

@InputType()
export class CreatePostInput {
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

    @Field(() => [CreateCommentInput], { nullable: true })
    @IsOptional()
    @Type(() => CreateCommentInput)
    comments?: CreateCommentInput[];

    @Field(() => [CreateUserInput], { nullable: true })
    @IsOptional()
    @Type(() => CreateUserInput)
    likes?: CreateUserInput[];

    @Field(() => CreateUserInput)
    @IsNotEmpty()
    @Type(() => CreateUserInput)
    user: CreateUserInput;

    @Field(() => [CreateUserInput], { nullable: true })
    @IsOptional()
    @Type(() => CreateUserInput)
    reader?: CreateUserInput[];

    @Field(() => [CreateMailInput], { nullable: true })
    @IsOptional()
    @Type(() => CreateMailInput)
    reply?: CreateMailInput[];
}

@InputType()
export class UpdatePostInput {
    @Field()
    @IsNotEmpty()
    id: string; // Assuming id is a string, update as needed

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

    @Field(() => [UpdateCommentInput], { nullable: true })
    @IsOptional()
    @Type(() => UpdateCommentInput)
    comments?: UpdateCommentInput[];

    @Field(() => [UpdateUserInput], { nullable: true })
    @IsOptional()
    @Type(() => UpdateUserInput)
    likes?: UpdateUserInput[];

    @Field(() => UpdateUserInput, { nullable: true })
    @IsOptional()
    @Type(() => UpdateUserInput)
    user?: UpdateUserInput;

    @Field(() => [UpdateUserInput], { nullable: true })
    @IsOptional()
    @Type(() => UpdateUserInput)
    reader?: UpdateUserInput[];

    @Field(() => [UpdateMailInput], { nullable: true })
    @IsOptional()
    @Type(() => UpdateMailInput)
    reply?: UpdateMailInput[];
}

@InputType()
export class SearchPostInput {
    @Field()
    @IsNotEmpty()
    id: string; // Assuming id is a string, update as needed
}
