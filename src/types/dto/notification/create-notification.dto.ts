import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class CreateNotificationDto {
    @Field({ nullable: true })
    @IsOptional()
    isDeleted?: boolean;

    @Field({ nullable: true })
    @IsOptional()
    isPin?: boolean;

    @Field({ nullable: true })
    @IsOptional()
    isRead?: boolean;

    @Field(() => Int, { nullable: true })
    @IsOptional()
    comment?: number;

    @Field(() => Int, { nullable: true })
    @IsOptional()
    mail?: number;

    @Field(() => String)
    @IsNotEmpty()
    user: string;
}
