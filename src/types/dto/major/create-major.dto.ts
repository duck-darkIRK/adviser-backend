import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { Subject, User } from '../../index';

@InputType()
export class CreateMajorDto {
    @Field()
    @IsNotEmpty()
    @IsString()
    majorName: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    Id: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsBoolean()
    isDeleted?: boolean;

    @Field(() => [User], { nullable: true })
    @IsOptional()
    @Type(() => User)
    users?: User[];

    @Field(() => [Subject], { nullable: true })
    @IsOptional()
    @Type(() => Subject)
    subjects?: Subject[];
}
