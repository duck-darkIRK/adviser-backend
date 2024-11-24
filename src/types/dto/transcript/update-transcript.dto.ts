import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsOptional } from 'class-validator';

@InputType()
export class UpdateTranscriptDto {
    @Field({ nullable: true })
    @IsOptional()
    @IsNumber()
    score?: number;
}
