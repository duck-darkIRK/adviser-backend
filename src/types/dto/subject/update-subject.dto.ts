import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { Class, Major, Transcript } from '../../index';

export class UpdateSubjectDto {
    @IsOptional()
    @IsString()
    subjectName?: string;

    @IsOptional()
    @IsBoolean()
    isDeleted?: boolean;

    @IsOptional()
    @Type(() => Class)
    classes?: Class[];

    @IsOptional()
    @Type(() => Transcript)
    inTranscript?: Transcript[];

    @IsOptional()
    @Type(() => Major)
    majors?: Major[];
}
