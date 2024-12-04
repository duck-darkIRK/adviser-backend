import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateCommentDto {
    @Field()
    @IsNotEmpty()
    @IsString()
    content: string;

    @Field()
    @IsNotEmpty()
    user: string;

    @Field({ nullable: true })
    @IsOptional()
    post?: number;

    @Field({ nullable: true })
    @IsOptional()
    reply?: number;
}
