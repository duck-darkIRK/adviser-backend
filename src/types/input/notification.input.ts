import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateUserInput, UpdateUserInput } from './user.input';
import { CreateCommentInput, UpdateCommentInput } from './comment.input';
import { CreateMailInput, UpdateMailInput } from './mail.input';

@InputType()
export class CreateNotificationInput {
    @Field()
    @IsNotEmpty()
    @IsBoolean()
    isPin: boolean;

    @Field()
    @IsNotEmpty()
    @IsBoolean()
    isDeleted: boolean;

    @Field()
    @IsNotEmpty()
    @IsBoolean()
    isRead: boolean;

    @Field(() => CreateCommentInput, { nullable: true })
    @IsOptional()
    @Type(() => CreateCommentInput)
    comment?: CreateCommentInput;

    @Field(() => CreateMailInput, { nullable: true })
    @IsOptional()
    @Type(() => CreateMailInput)
    mail?: CreateMailInput;

    @Field(() => CreateUserInput)
    @IsNotEmpty()
    @Type(() => CreateUserInput)
    user: CreateUserInput;
}

@InputType()
export class UpdateNotificationInput {
    @Field()
    @IsNotEmpty()
    id: string; // Assuming id is a string, update as needed

    @Field({ nullable: true })
    @IsOptional()
    @IsBoolean()
    isPin?: boolean;

    @Field({ nullable: true })
    @IsOptional()
    @IsBoolean()
    isDeleted?: boolean;

    @Field({ nullable: true })
    @IsOptional()
    @IsBoolean()
    isRead?: boolean;

    @Field(() => UpdateCommentInput, { nullable: true })
    @IsOptional()
    @Type(() => UpdateCommentInput)
    comment?: UpdateCommentInput;

    @Field(() => UpdateMailInput, { nullable: true })
    @IsOptional()
    @Type(() => UpdateMailInput)
    mail?: UpdateMailInput;

    @Field(() => UpdateUserInput, { nullable: true })
    @IsOptional()
    @Type(() => UpdateUserInput)
    user?: UpdateUserInput;
}

@InputType()
export class SearchNotificationInput {
    @Field()
    @IsNotEmpty()
    id: string; // Assuming id is a string, update as needed
}
