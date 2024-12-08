import { Field, InputType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateTimetableSheetDto {
    @Field()
    @IsNotEmpty()
    @IsInt()
    time: number;

    @Field()
    @IsNotEmpty()
    @IsInt()
    day: number;

    @Field()
    @IsNotEmpty()
    @IsString()
    classCode: string;
}
