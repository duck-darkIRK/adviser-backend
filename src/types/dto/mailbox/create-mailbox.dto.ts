import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { Mail, User } from '../../index';

@InputType()
export class CreateMailboxDto {
    @Field(() => User)
    @IsNotEmpty()
    @Type(() => User)
    user: User;

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
