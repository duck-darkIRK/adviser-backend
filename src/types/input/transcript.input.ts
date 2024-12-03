import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateUserInput, UpdateUserInput } from './user.input'; // Giả sử bạn đã có CreateUserInput và UpdateUserInput
import { CreateSubjectInput, UpdateSubjectInput } from './subject.input'; // Giả sử bạn đã có CreateSubjectInput và UpdateSubjectInput

@InputType()
export class CreateTranscriptInput {
    @Field(() => CreateUserInput)
    @Type(() => CreateUserInput)
    @IsNotEmpty()
    user: CreateUserInput;

    @Field(() => CreateSubjectInput)
    @Type(() => CreateSubjectInput)
    @IsNotEmpty()
    subject: CreateSubjectInput;

    @Field()
    @IsNumber()
    score: number;
}

@InputType()
export class UpdateTranscriptInput {
    @Field()
    @IsNotEmpty()
    id: number; // Assuming id is an integer, update as needed

    @Field(() => UpdateUserInput, { nullable: true })
    @IsOptional()
    @Type(() => UpdateUserInput)
    user?: UpdateUserInput;

    @Field(() => UpdateSubjectInput, { nullable: true })
    @IsOptional()
    @Type(() => UpdateSubjectInput)
    subject?: UpdateSubjectInput;

    @Field({ nullable: true })
    @IsOptional()
    @IsNumber()
    score?: number;
}

@InputType()
export class SearchTranscriptInput {
    @Field()
    @IsNotEmpty()
    userId: number; // Assuming userId is an integer, update as needed
}
