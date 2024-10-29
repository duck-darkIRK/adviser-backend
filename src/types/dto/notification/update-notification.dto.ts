import { IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { Comment, Mail, User } from '../../index';

export class UpdateNotificationDto {
    @IsOptional()
    isRead?: boolean;

    @IsOptional()
    isDeleted?: boolean;

    @IsOptional()
    isPin?: boolean;

    @IsOptional()
    @Type(() => Comment)
    comment?: Comment;

    @IsOptional()
    @Type(() => Mail)
    mail?: Mail;

    @IsOptional()
    @Type(() => User)
    user?: User;
}
