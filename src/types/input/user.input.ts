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
export class CreateUserInput {
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
    majors: string[];

    @Field(() => [String], { nullable: true })
    @IsOptional()
    @IsArray()
    transcripts: string[];

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

@InputType()
export class UpdateUserInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    Id: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    avatar?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsBoolean()
    isOnline?: boolean;

    @Field({ nullable: true })
    @IsOptional()
    @IsBoolean()
    isBaned?: boolean;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    firstName?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    lastName?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsDate()
    birthdate?: Date;

    @Field({ nullable: true })
    @IsOptional()
    @IsEmail()
    email?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    phone?: string;

    @Field(() => [String], { nullable: true })
    @IsOptional()
    @IsArray()
    roles?: string[];

    @Field(() => [String], { nullable: true })
    @IsOptional()
    @IsArray()
    majors?: string[];

    @Field(() => [String], { nullable: true })
    @IsOptional()
    @IsArray()
    transcripts?: string[];

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    username?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    password?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    refresh_token?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsDate()
    updatedAt?: Date;
}

@InputType()
export class SearchUserInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    Id: string;
}
