import { Field, InputType } from '@nestjs/graphql';
import {
    ArrayMinSize,
    ArrayNotEmpty,
    IsArray,
    IsBoolean,
    IsDate,
    IsEmail,
    IsIn,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';

@InputType()
export class CreateUserDto {
    @Field({ nullable: true })
    @IsString()
    idPrefix?: string;

    @Field()
    @IsNotEmpty()
    @IsNumber()
    code: number;

    @Field({ nullable: true })
    @IsBoolean()
    @IsOptional()
    isBaned?: boolean;

    @Field()
    @IsString()
    firstName: string;

    @Field()
    @IsString()
    lastName: string;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    avatar?: string;

    @Field({ nullable: true })
    @IsDate()
    @IsOptional()
    birthdate: Date;

    @Field({ nullable: true })
    @IsEmail()
    @IsOptional()
    email?: string;

    @Field(() => [String])
    @IsArray()
    @ArrayNotEmpty()
    @ArrayMinSize(1)
    @IsIn(['admin', 'teacher', 'student', 'superAdmin'], { each: true })
    roles: ('admin' | 'teacher' | 'student' | 'superAdmin')[];

    @Field()
    @IsString()
    username: string;

    @Field()
    @IsString()
    password: string;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    refresh_token: string;

    @Field({ nullable: true })
    createdAt?: Date;

    @Field({ nullable: true })
    updatedAt?: Date;

    @Field(() => [String], { nullable: true })
    @IsArray()
    @IsOptional()
    majors?: string[];
}
