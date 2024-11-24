import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { Subject, User } from '../../index';

@InputType()
export class CreateTranscriptDto {
    @Field()
    @IsNotEmpty()
    @IsNumber()
    score: number;

    @Field(() => User)
    @IsNotEmpty()
    @Type(() => User)
    user: User;

    @Field(() => Subject, { nullable: true })
    @IsOptional()
    @Type(() => Subject)
    subject?: Subject;
}
