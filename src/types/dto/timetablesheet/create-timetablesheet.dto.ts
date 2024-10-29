import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { Timetable } from '../../index';

export class CreateTimetableSheetDto {
    @IsNotEmpty()
    @IsInt()
    time: number;

    @IsNotEmpty()
    @IsInt()
    day: number;

    @IsNotEmpty()
    @Type(() => Timetable)
    timetable: Timetable;

    @IsNotEmpty()
    @IsString()
    class: string;
}
