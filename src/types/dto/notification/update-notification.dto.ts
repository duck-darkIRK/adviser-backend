import { Field, InputType, Int } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

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

    @Field(() => Int, { nullable: true })
    @IsOptional()
    comment?: number;

    @Field(() => Int, { nullable: true })
    @IsOptional()
    mail?: number;

    @Field(() => String, { nullable: true })
    @IsOptional()
    user?: string;
}
