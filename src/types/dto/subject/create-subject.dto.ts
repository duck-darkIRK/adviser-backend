import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class CreateSubjectDto {
    @Field()
    @IsNotEmpty()
    @IsString()
    subjectName: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    Id: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsBoolean()
    isDeleted?: boolean;

    @Field(() => [String], { nullable: 'itemsAndList' })
    @IsOptional()
    @Type(() => String)
    majors?: string[];
}
