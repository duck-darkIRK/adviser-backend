import { IsBoolean, IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { TimetableSheet, User } from '../../index';

export class CreateTimetableDto {
    @IsNotEmpty()
    @Type(() => User)
    user: User;

    @IsOptional()
    @Type(() => TimetableSheet)
    sheets?: TimetableSheet[];

    @IsOptional()
    @IsBoolean()
    isDeleted?: boolean;

    @IsNotEmpty()
    @IsInt()
    semester: number;

    @IsNotEmpty()
    @IsInt()
    year: number;
}
