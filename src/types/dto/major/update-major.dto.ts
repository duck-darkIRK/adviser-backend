import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class UpdateMajorDto {
    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    majorName?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsBoolean()
    isDeleted?: boolean;

    @Field(() => [String], { nullable: true })
    @IsOptional()
    @Type(() => String)
    users?: string[];

    @Field(() => [Number], { nullable: true })
    @IsOptional()
    @Type()
    subjects?: number[];
}
