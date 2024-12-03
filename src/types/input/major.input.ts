import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateUserInput } from './user.input';
import { CreateSubjectInput, UpdateSubjectInput } from './subject.input';

@InputType()
export class CreateMajorInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    majorName: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    Id: string;

    @Field(() => [CreateSubjectInput], { nullable: true })
    @IsOptional()
    @Type(() => CreateSubjectInput)
    subjects?: CreateSubjectInput[];
}

@InputType()
export class UpdateMajorInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    Id: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsBoolean()
    isDeleted?: boolean;

    @Field(() => [UpdateUserInput], { nullable: true })
    @IsOptional()
    @Type(() => UpdateUserInput)
    users?: UpdateUserInput[];

    @Field(() => [UpdateSubjectInput], { nullable: true })
    @IsOptional()
    @Type(() => UpdateSubjectInput)
    subjects?: UpdateSubjectInput[];
}

@InputType()
export class SearchMajorInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    Id: string; // Assuming Id is a string
}
