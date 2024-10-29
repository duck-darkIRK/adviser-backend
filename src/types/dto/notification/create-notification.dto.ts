import { IsNotEmpty, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { Comment, Mail, User } from '../../index';

export class CreateNotificationDto {
    @IsOptional()
    isDeleted?: boolean;

    @IsOptional()
    isPin?: boolean;

    @IsOptional()
    isRead?: boolean;

    @IsOptional()
    @Type(() => Comment)
    comment?: Comment;

    @IsOptional()
    @Type(() => Mail)
    mail?: Mail;

    @IsNotEmpty()
    @Type(() => User)
    user: User;
}
