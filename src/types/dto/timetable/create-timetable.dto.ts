import { Field, InputType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateTimetableSheetDto } from '../../index';

@InputType()
export class CreateTimetableDto {
    @Field()
    @IsNotEmpty()
    user: string;

    @Field(() => [CreateTimetableSheetDto], { nullable: 'itemsAndList' })
    @IsOptional()
    @Type(() => CreateTimetableSheetDto)
    sheets?: CreateTimetableSheetDto[];

    @Field()
    @IsNotEmpty()
    @IsInt()
    semester: number;

    @Field()
    @IsNotEmpty()
    @IsInt()
    year: number;
}
