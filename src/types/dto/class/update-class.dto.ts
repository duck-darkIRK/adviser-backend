import { Field, InputType, Int } from '@nestjs/graphql';
import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { Subject, User } from '../../index';

@InputType()
export class UpdateClassDto {
    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    classCode?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsBoolean()
    isDeleted?: boolean;

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsInt()
    size?: number;

    @Field(() => [User], { nullable: true })
    @IsOptional()
    @Type(() => User)
    students?: User[];

    @Field(() => [User], { nullable: true })
    @IsOptional()
    @Type(() => User)
    teachers?: User[];

    @Field(() => Subject, { nullable: true })
    @IsOptional()
    @Type(() => Subject)
    subject?: Subject;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    status?: string;
}
