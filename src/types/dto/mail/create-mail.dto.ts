import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class CreateMailDto {
    @Field({ nullable: true, defaultValue: 'default' })
    @IsOptional()
    @IsString()
    type: 'default' | 'student' | 'all';

    @Field()
    @IsNotEmpty()
    @IsString()
    name: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    content: string;

    @Field()
    @IsNotEmpty()
    sender: string;

    @Field()
    @IsNotEmpty()
    receiver: string;

    @Field({ nullable: true })
    @IsOptional()
    @Type(() => Number)
    replyToMail?: number;

    @Field({ nullable: true })
    @IsOptional()
    @Type(() => Number)
    replyToPost?: number;

    @Field({ nullable: true })
    @IsOptional()
    @Type(() => Number)
    replyToCmt?: number;
}
