import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateMailDto {
    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    type: 'default' | 'student' | 'all';
}
