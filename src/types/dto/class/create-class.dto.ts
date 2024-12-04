import { Field, InputType, Int } from '@nestjs/graphql';
import {
    IsBoolean,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class CreateClassDto {
    @Field()
    @IsNotEmpty()
    @IsString()
    classCode: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsBoolean()
    isDeleted?: boolean;

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsInt()
    size: number;

    @Field(() => [String], { nullable: true })
    @IsOptional()
    @Type(() => String)
    students?: string[];

    @Field(() => [String], { nullable: true })
    @IsOptional()
    @Type(() => String)
    teachers?: string[];

    @Field()
    @IsNotEmpty()
    @Type(() => String)
    subject: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    status?: string;
}
