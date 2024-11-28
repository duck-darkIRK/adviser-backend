// major.input.ts
import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { UserInput } from './user.input'; // Giả sử bạn đã có UserInput
import { SubjectInput } from './subject.input'; // Giả sử bạn đã có SubjectInput

@InputType()
export class MajorInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    Id: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsBoolean()
    isDeleted?: boolean;

    @Field(() => [UserInput], { nullable: true })
    @IsOptional()
    @Type(() => UserInput)
    users?: UserInput[];

    @Field(() => [SubjectInput], { nullable: true })
    @IsOptional()
    @Type(() => SubjectInput)
    subjects?: SubjectInput[];
}

// @InputType()
// export class UpdateMajorInput {
//     @Field()
//     @IsNotEmpty()
//     @IsString()
//     Id: string;
//
//     @Field({ nullable: true })
//     @IsOptional()
//     @IsBoolean()
//     isDeleted?: boolean;
//
//     @Field(() => [UserInput], { nullable: true })
//     @IsOptional()
//     @Type(() => UserInput)
//     users?: UserInput[];
//
//     @Field(() => [SubjectInput], { nullable: true })
//     @IsOptional()
//     @Type(() => SubjectInput)
//     subjects?: SubjectInput[];
// }
