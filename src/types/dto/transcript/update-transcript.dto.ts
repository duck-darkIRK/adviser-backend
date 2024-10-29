import { IsNumber, IsOptional } from 'class-validator';

export class UpdateTranscriptDto {
    @IsOptional()
    @IsNumber()
    score?: number;
}
