import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { Subject, User } from '../../index';

export class UpdateClassDto {
    @IsOptional()
    @IsString()
    classCode?: string;

    @IsOptional()
    @IsBoolean()
    isDeleted?: boolean;

    @IsOptional()
    @IsInt()
    size?: number;

    @IsOptional()
    @Type(() => User)
    students?: User[];

    @IsOptional()
    @Type(() => User)
    teachers?: User[];

    @IsOptional()
    @Type(() => Subject)
    subject?: Subject;

    @IsOptional()
    @IsString()
    status?: string;
}
