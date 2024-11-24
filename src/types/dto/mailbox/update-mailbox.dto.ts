import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { Mail } from '../../index';

@InputType()
export class UpdateMailboxDto {
    @Field({ nullable: true })
    @IsOptional()
    isDeleted?: boolean;

    @Field(() => [Mail], { nullable: true })
    @IsOptional()
    @IsArray()
    @Type(() => Mail)
    mailsCome?: Mail[];

    @Field(() => [Mail], { nullable: true })
    @IsOptional()
    @IsArray()
    @Type(() => Mail)
    mailsTo?: Mail[];
}
