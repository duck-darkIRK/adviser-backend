import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { Subject, User } from '../../index';

export class CreateTranscriptDto {
    @IsNotEmpty()
    @IsNumber()
    score: number;

    @IsNotEmpty()
    @Type(() => User)
    user: User;

    @IsOptional()
    @Type(() => Subject)
    subject?: Subject;
}
