import { Field, InputType, Int } from '@nestjs/graphql';
import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateClassDto {
    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    classCode?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsBoolean()
    isDeleted?: boolean;

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsInt()
    size?: number;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    status?: string;
}
