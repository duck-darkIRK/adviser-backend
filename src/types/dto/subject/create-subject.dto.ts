import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { Class, Major, Transcript } from '../../index';

@InputType()
export class CreateSubjectDto {
    @Field()
    @IsNotEmpty()
    @IsString()
    subjectName: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    Id: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsBoolean()
    isDeleted?: boolean;

    @Field(() => [Class], { nullable: 'itemsAndList' })
    @IsOptional()
    @Type(() => Class)
    classes?: Class[];

    @Field(() => [Transcript], { nullable: 'itemsAndList' })
    @IsOptional()
    @Type(() => Transcript)
    inTranscript?: Transcript[];

    @Field(() => [Major], { nullable: 'itemsAndList' })
    @IsOptional()
    @Type(() => Major)
    majors?: Major[];
}
