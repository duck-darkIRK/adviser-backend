import { IsArray, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { Mail } from '../../index';

export class UpdateMailboxDto {
    @IsOptional()
    isDeleted?: boolean;

    @IsOptional()
    @IsArray()
    @Type(() => Mail)
    mailsCome?: Mail[];

    @IsOptional()
    @IsArray()
    @Type(() => Mail)
    mailsTo?: Mail[];
}
