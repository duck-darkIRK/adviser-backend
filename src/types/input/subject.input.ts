// subject.input.ts
import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ClassInput } from './class.input'; // Giả sử bạn đã có ClassInput
import { TranscriptInput } from './transcript.input'; // Giả sử bạn đã có TranscriptInput
import { MajorInput } from './major.input'; // Giả sử bạn đã có MajorInput

@InputType()
export class SubjectInput {
    @Field()
    @IsNotEmpty()
    Id: string;

    @Field()
    @IsString()
    subjectName: string;

    @Field()
    @IsBoolean()
    isDeleted: boolean;

    @Field(() => [ClassInput])
    @Type(() => ClassInput)
    classes: ClassInput[];

    @Field(() => [TranscriptInput], { nullable: true })
    @IsOptional()
    @Type(() => TranscriptInput)
    inTranscript?: TranscriptInput[];

    @Field(() => [MajorInput])
    @Type(() => MajorInput)
    majors: MajorInput[];

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}
