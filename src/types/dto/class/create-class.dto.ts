import { Field, InputType, Int } from '@nestjs/graphql';
import {
    IsBoolean,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Subject, User } from '../../index';

@InputType() // Định nghĩa là GraphQL InputType
export class CreateClassDto {
    @Field() // GraphQL Field
    @IsNotEmpty() // REST validation
    @IsString()
    classCode: string;

    @Field({ nullable: true }) // nullable = true cho trường tùy chọn
    @IsOptional()
    @IsBoolean()
    isDeleted?: boolean;

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsInt()
    size: number;

    @Field(() => [User], { nullable: true }) // Mảng User
    @IsOptional()
    @Type(() => User)
    students?: User[];

    @Field(() => [User], { nullable: true }) // Mảng User
    @IsOptional()
    @Type(() => User)
    teachers?: User[];

    @Field(() => Subject) // Subject bắt buộc
    @IsNotEmpty()
    @Type(() => Subject)
    subject: Subject;

    @Field({ nullable: true }) // Trường trạng thái tùy chọn
    @IsOptional()
    @IsString()
    status?: string;
}
