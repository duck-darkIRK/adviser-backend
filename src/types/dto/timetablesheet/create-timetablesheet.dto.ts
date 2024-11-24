import { Field, InputType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { Timetable } from '../../index';

@InputType()
export class CreateTimetableSheetDto {
    @Field()
    @IsNotEmpty()
    @IsInt()
    time: number;

    @Field()
    @IsNotEmpty()
    @IsInt()
    day: number;

    @Field(() => [Timetable], { nullable: 'itemsAndList' })
    @IsNotEmpty()
    @Type(() => Timetable)
    timetable: Timetable;

    @Field()
    @IsNotEmpty()
    @IsString()
    class: string;
}
