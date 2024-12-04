import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class CreateTranscriptDto {
    @Field()
    @IsNotEmpty()
    @IsNumber()
    score: number;

    @Field()
    @IsNotEmpty()
    user: string;

    @Field()
    @IsNotEmpty()
    subject: string;
}
