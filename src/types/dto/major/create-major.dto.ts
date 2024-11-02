import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { Subject, User } from '../../index';

export class CreateMajorDto {
    @IsNotEmpty()
    @IsString()
    majorName: string;

    @IsNotEmpty()
    @IsString()
    Id: string;

    @IsOptional()
    @IsBoolean()
    isDeleted?: boolean;

    @IsOptional()
    @Type(() => User)
    users?: User[];

    @IsOptional()
    @Type(() => Subject)
    subjects?: Subject[];
}
