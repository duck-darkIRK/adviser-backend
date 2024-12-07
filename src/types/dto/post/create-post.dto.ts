import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreatePostDto {
    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    title?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    content?: string;

    @Field(() => [String], { nullable: 'itemsAndList' })
    @IsOptional()
    @IsArray()
    image?: string[];

    @Field()
    @IsNotEmpty()
    user: string;
}
