import {
    IsBoolean,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Subject, User } from '../../index';

export class CreateClassDto {
    @IsNotEmpty()
    @IsString()
    classCode: string;

    @IsOptional()
    @IsBoolean()
    isDeleted?: boolean;

    @IsOptional()
    @IsInt()
    size: number;

    @IsOptional()
    @Type(() => User)
    students?: User[];

    @IsOptional()
    @Type(() => User)
    teachers?: User[];

    @IsNotEmpty()
    @Type(() => Subject)
    subject: Subject;

    @IsOptional()
    @IsString()
    status?: string;
}
