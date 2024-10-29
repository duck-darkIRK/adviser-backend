import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateTimetableSheetDto {
    @IsOptional()
    @IsInt()
    time?: number;

    @IsOptional()
    @IsInt()
    day?: number;

    @IsOptional()
    @IsString()
    class?: string;
}
