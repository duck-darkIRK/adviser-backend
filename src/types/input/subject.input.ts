import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateClassInput, UpdateClassInput } from './class.input';
import {
    CreateTranscriptInput,
    UpdateTranscriptInput,
} from './transcript.input';
import { CreateMajorInput, UpdateMajorInput } from './major.input';

@InputType()
export class CreateSubjectInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    subjectName: string;

    @Field()
    @IsBoolean()
    isDeleted: boolean;

    @Field(() => [CreateClassInput])
    @Type(() => CreateClassInput)
    classes: CreateClassInput[];

    @Field(() => [CreateTranscriptInput], { nullable: true })
    @IsOptional()
    @Type(() => CreateTranscriptInput)
    inTranscript?: CreateTranscriptInput[];

    @Field(() => [CreateMajorInput])
    @Type(() => CreateMajorInput)
    majors: CreateMajorInput[];

    @Field()
    @IsNotEmpty()
    createdAt: Date;

    @Field()
    @IsNotEmpty()
    updatedAt: Date;
}

@InputType()
export class UpdateSubjectInput {
    @Field()
    @IsNotEmpty()
    id: string; // Assuming id is a string, update as needed

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    subjectName?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsBoolean()
    isDeleted?: boolean;

    @Field(() => [UpdateClassInput], { nullable: true })
    @IsOptional()
    @Type(() => UpdateClassInput)
    classes?: UpdateClassInput[];

    @Field(() => [UpdateTranscriptInput], { nullable: true })
    @IsOptional()
    @Type(() => UpdateTranscriptInput)
    inTranscript?: UpdateTranscriptInput[];

    @Field(() => [UpdateMajorInput], { nullable: true })
    @IsOptional()
    @Type(() => UpdateMajorInput)
    majors?: UpdateMajorInput[];

    @Field({ nullable: true })
    @IsOptional()
    createdAt?: Date;

    @Field({ nullable: true })
    @IsOptional()
    updatedAt?: Date;
}

@InputType()
export class SearchSubjectInput {
    @Field()
    @IsNotEmpty()
    id: string; // Assuming id is a string, update as needed
}
