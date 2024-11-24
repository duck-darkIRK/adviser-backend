import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsInt, IsOptional } from 'class-validator';

@InputType()
export class UpdateTimetableDto {
    @Field({ nullable: true })
    @IsOptional()
    @IsBoolean()
    isDeleted?: boolean;

    @Field({ nullable: true })
    @IsOptional()
    @IsInt()
    semester?: number;

    @Field({ nullable: true })
    @IsOptional()
    @IsInt()
    year?: number;
}
