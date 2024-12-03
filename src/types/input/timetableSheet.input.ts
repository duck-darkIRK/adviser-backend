import { Field, InputType } from '@nestjs/graphql';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateTimetableInput, UpdateTimetableInput } from './timetable.input'; // Giả sử bạn đã có CreateTimetableInput và UpdateTimetableInput

@InputType()
export class CreateTimetableSheetInput {
    @Field()
    @IsInt()
    time: number;

    @Field()
    @IsInt()
    day: number;

    @Field(() => CreateTimetableInput)
    @Type(() => CreateTimetableInput)
    timetable: CreateTimetableInput;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    class?: string;
}

@InputType()
export class UpdateTimetableSheetInput {
    @Field()
    @IsInt()
    id: number; // Assuming id is an integer, update as needed

    @Field({ nullable: true })
    @IsOptional()
    @IsInt()
    time?: number;

    @Field({ nullable: true })
    @IsOptional()
    @IsInt()
    day?: number;

    @Field(() => UpdateTimetableInput, { nullable: true })
    @IsOptional()
    @Type(() => UpdateTimetableInput)
    timetable?: UpdateTimetableInput;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    class?: string;
}

@InputType()
export class SearchTimetableSheetInput {
    @Field()
    @IsInt()
    id: number; // Assuming id is an integer, update as needed
}
