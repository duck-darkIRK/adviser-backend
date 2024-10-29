import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { Mail, User } from '../../index';

export class CreateMailboxDto {
    @IsNotEmpty()
    @Type(() => User)
    user: User;

    @IsOptional()
    @IsArray()
    @Type(() => Mail)
    mailsCome?: Mail[];

    @IsOptional()
    @IsArray()
    @Type(() => Mail)
    mailsTo?: Mail[];
}
