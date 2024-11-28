// timetableSheet.input.ts
import { Field, InputType } from '@nestjs/graphql';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { TimetableInput } from './timetable.input'; // Giả sử bạn đã có TimetableInput

@InputType()
export class TimetableSheetInput {
    @Field()
    @IsInt()
    time: number;

    @Field()
    @IsInt()
    day: number;

    @Field(() => TimetableInput)
    @Type(() => TimetableInput)
    timetable: TimetableInput;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    class?: string;
}
