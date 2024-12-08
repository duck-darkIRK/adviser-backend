import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateGroupDto {
    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    classCode?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsBoolean()
    isDeleted?: boolean;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    status?: string;
}
