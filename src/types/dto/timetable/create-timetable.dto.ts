import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { TimetableSheet, User } from '../../index';

@InputType()
export class CreateTimetableDto {
    @Field(() => User)
    @IsNotEmpty()
    @Type(() => User)
    user: User;

    @Field(() => [TimetableSheet], { nullable: 'itemsAndList' })
    @IsOptional()
    @Type(() => TimetableSheet)
    sheets?: TimetableSheet[];

    @Field({ nullable: true })
    @IsOptional()
    @IsBoolean()
    isDeleted?: boolean;

    @Field()
    @IsNotEmpty()
    @IsInt()
    semester: number;

    @Field()
    @IsNotEmpty()
    @IsInt()
    year: number;
}
