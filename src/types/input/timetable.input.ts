// timetable.input.ts
import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { UserInput } from './user.input'; // Giả sử bạn đã có UserInput
import { TimetableSheetInput } from './timetableSheet.input'; // Giả sử bạn đã có TimetableSheetInput

@InputType()
export class TimetableInput {
    @Field()
    @IsInt()
    semester: number;

    @Field()
    @IsInt()
    year: number;

    @Field(() => UserInput)
    @Type(() => UserInput)
    user: UserInput;

    @Field(() => [TimetableSheetInput])
    @Type(() => TimetableSheetInput)
    sheets: TimetableSheetInput[];

    @Field()
    @IsBoolean()
    isDeleted: boolean;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}
