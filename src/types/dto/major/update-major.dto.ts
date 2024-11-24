import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { Subject, User } from '../../index';

@InputType()
export class UpdateMajorDto {
    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    majorName?: string;

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
