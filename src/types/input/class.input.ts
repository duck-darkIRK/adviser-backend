import { Field, InputType, Int } from '@nestjs/graphql';
import {
    IsBoolean,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateUserInput, UpdateUserInput } from './user.input';
import { CreateSubjectInput, UpdateSubjectInput } from './subject.input';

@InputType()
export class CreateClassInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    classCode: string;

    @Field()
    @IsNotEmpty()
    @IsBoolean()
    isDeleted: boolean;

    @Field(() => Int)
    @IsNotEmpty()
    @IsInt()
    size: number;

    @Field(() => [CreateUserInput], { nullable: true })
    @IsOptional()
    @Type(() => CreateUserInput)
    students?: CreateUserInput[];

    @Field(() => [CreateUserInput], { nullable: true })
    @IsOptional()
    @Type(() => CreateUserInput)
    teachers?: CreateUserInput[];

    @Field(() => CreateSubjectInput)
    @IsNotEmpty()
    @Type(() => CreateSubjectInput)
    subject: CreateSubjectInput;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    status?: string;
}

@InputType()
export class UpdateClassInput {
    @Field()
    @IsNotEmpty()
    @IsInt()
    Id: number;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    classCode?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsBoolean()
    isDeleted?: boolean;

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsInt()
    size?: number;

    @Field(() => [UpdateUserInput], { nullable: true })
    @IsOptional()
    @Type(() => UpdateUserInput)
    students?: UpdateUserInput[];

    @Field(() => [UpdateUserInput], { nullable: true })
    @IsOptional()
    @Type(() => UpdateUserInput)
    teachers?: UpdateUserInput[];

    @Field(() => UpdateSubjectInput, { nullable: true })
    @IsOptional()
    @Type(() => UpdateSubjectInput)
    subject?: UpdateSubjectInput;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    status?: string;
}

@InputType()
export class SearchClassInput {
    @Field()
    @IsNotEmpty()
    @IsInt()
    Id: number;
}
