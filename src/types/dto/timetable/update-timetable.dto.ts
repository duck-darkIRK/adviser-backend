import { IsBoolean, IsInt, IsOptional } from 'class-validator';

export class UpdateTimetableDto {
    @IsOptional()
    @IsBoolean()
    isDeleted?: boolean;

    @IsOptional()
    @IsInt()
    semester?: number;

    @IsOptional()
    @IsInt()
    year?: number;
}
