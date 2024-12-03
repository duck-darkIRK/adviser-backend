import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateMajorDto {
    @Field()
    @IsNotEmpty()
    @IsString()
    majorName: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    Id: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsBoolean()
    isDeleted?: boolean;

    @Field(() => [String], { nullable: true })
    @IsOptional()
    subjects: string[];
}
