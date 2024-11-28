// user.input.ts
import { Field, InputType } from '@nestjs/graphql';
import {
    IsArray,
    IsBoolean,
    IsDate,
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
} from 'class-validator';

@InputType()
export class UserInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    Id: string;

    @Field()
    @IsNotEmpty()
    code: number;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    avatar: string;

    @Field()
    @IsNotEmpty()
    idPrefix: string;

    @Field()
    @IsNotEmpty()
    @IsBoolean()
    isOnline: boolean;

    @Field()
    @IsNotEmpty()
    @IsBoolean()
    isBaned: boolean;

    @Field()
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    lastName: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsDate()
    birthdate: Date;

    @Field({ nullable: true })
    @IsOptional()
    @IsEmail()
    email: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    phone: string;

    @Field(() => [String], { nullable: true })
    @IsOptional()
    @IsArray()
    roles: string[];

    @Field(() => [String], { nullable: true })
    @IsOptional()
    @IsArray()
    majors: string[]; // Hoặc có thể là ID của MajorEntity nếu cần

    @Field(() => [String], { nullable: true })
    @IsOptional()
    @IsArray()
    transcripts: string[]; // Hoặc có thể là ID của TranscriptEntity nếu cần

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    username: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    password: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    refresh_token: string;

    @Field()
    @IsNotEmpty()
    @IsDate()
    createdAt: Date;

    @Field()
    @IsNotEmpty()
    @IsDate()
    updatedAt: Date;
}
