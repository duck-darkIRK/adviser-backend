// class.input.ts
import { Field, InputType, Int } from '@nestjs/graphql';
import {
    IsBoolean,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UserInput } from './user.input';
import { SubjectInput } from './subject.input';

@InputType()
export class ClassInput {
    @Field()
    @IsNotEmpty()
    @IsInt()
    Id: number;

    @Field()
    @IsNotEmpty()
    @IsString()
    classCode: string;

    @Field()
    @IsNotEmpty()
    @IsBoolean()
    isDeleted: boolean;

    @Field(() => Int)
    @IsNotEmpty()
    @IsInt()
    size: number;

    @Field(() => [UserInput], { nullable: true })
    @IsOptional()
    @Type(() => UserInput)
    students?: UserInput[];

    @Field(() => [UserInput], { nullable: true })
    @IsOptional()
    @Type(() => UserInput)
    teachers?: UserInput[];

    @Field(() => SubjectInput)
    @IsNotEmpty()
    @Type(() => SubjectInput)
    subject: SubjectInput;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    status?: string;

    @Field()
    @IsNotEmpty()
    createdAt: Date;

    @Field()
    @IsNotEmpty()
    updatedAt: Date;
}
