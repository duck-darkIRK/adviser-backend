import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { Subject, User } from '../../index';

export class UpdateMajorDto {
    @IsOptional()
    @IsString()
    majorName?: string;

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
