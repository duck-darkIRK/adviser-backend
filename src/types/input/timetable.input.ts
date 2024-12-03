import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateUserInput, UpdateUserInput } from './user.input'; // Giả sử bạn đã có CreateUserInput và UpdateUserInput
import {
    CreateTimetableSheetInput,
    UpdateTimetableSheetInput,
} from './timetableSheet.input'; // Giả sử bạn đã có CreateTimetableSheetInput và UpdateTimetableSheetInput

@InputType()
export class CreateTimetableInput {
    @Field()
    @IsInt()
    semester: number;

    @Field()
    @IsInt()
    year: number;

    @Field(() => CreateUserInput)
    @Type(() => CreateUserInput)
    user: CreateUserInput;

    @Field(() => [CreateTimetableSheetInput])
    @Type(() => CreateTimetableSheetInput)
    sheets: CreateTimetableSheetInput[];

    @Field()
    @IsBoolean()
    isDeleted: boolean;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}

@InputType()
export class UpdateTimetableInput {
    @Field()
    @IsInt()
    id: number; // Assuming id is an integer, update as needed

    @Field({ nullable: true })
    @IsOptional()
    @IsInt()
    semester?: number;

    @Field({ nullable: true })
    @IsOptional()
    @IsInt()
    year?: number;

    @Field(() => UpdateUserInput, { nullable: true })
    @IsOptional()
    @Type(() => UpdateUserInput)
    user?: UpdateUserInput;

    @Field(() => [UpdateTimetableSheetInput], { nullable: true })
    @IsOptional()
    @Type(() => UpdateTimetableSheetInput)
    sheets?: UpdateTimetableSheetInput[];

    @Field({ nullable: true })
    @IsOptional()
    @IsBoolean()
    isDeleted?: boolean;

    @Field({ nullable: true })
    @IsOptional()
    createdAt?: Date;

    @Field({ nullable: true })
    @IsOptional()
    updatedAt?: Date;
}

@InputType()
export class SearchTimetableInput {
    @Field()
    @IsInt()
    id: number; // Assuming id is an integer, update as needed
}
