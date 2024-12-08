import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class CreateGroupDto {
    @Field()
    @IsNotEmpty()
    @IsString()
    classCode: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsBoolean()
    isDeleted?: boolean;

    @Field(() => [String], { nullable: true })
    @IsOptional()
    @Type(() => String)
    students?: string[];

    @Field(() => [String], { nullable: true })
    @IsOptional()
    @Type(() => String)
    advisers?: string[];

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    status?: string;
}
