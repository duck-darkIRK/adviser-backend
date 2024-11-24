import { Field, InputType } from '@nestjs/graphql';
import { IsInt, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateTimetableSheetDto {
    @Field({ nullable: true })
    @IsOptional()
    @IsInt()
    time?: number;

    @Field({ nullable: true })
    @IsOptional()
    @IsInt()
    day?: number;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    class?: string;
}
