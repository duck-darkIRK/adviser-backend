import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { Comment, Mail, User } from '../../index';

@InputType()
export class UpdateNotificationDto {
    @Field({ nullable: true })
    @IsOptional()
    isRead?: boolean;

    @Field({ nullable: true })
    @IsOptional()
    isDeleted?: boolean;

    @Field({ nullable: true })
    @IsOptional()
    isPin?: boolean;

    @Field(() => Comment, { nullable: true })
    @IsOptional()
    @Type(() => Comment)
    comment?: Comment;

    @Field(() => Mail, { nullable: true })
    @IsOptional()
    @Type(() => Mail)
    mail?: Mail;

    @Field(() => User, { nullable: true })
    @IsOptional()
    @Type(() => User)
    user?: User;
}
