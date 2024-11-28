// transcript.input.ts
import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { UserInput } from './user.input'; // Giả sử bạn đã có UserInput
import { SubjectInput } from './subject.input'; // Giả sử bạn đã có SubjectInput

@InputType()
export class TranscriptInput {
    @Field(() => UserInput)
    @Type(() => UserInput)
    @IsNotEmpty()
    user: UserInput;

    @Field(() => SubjectInput)
    @Type(() => SubjectInput)
    @IsNotEmpty()
    subject: SubjectInput;

    @Field()
    @IsNumber()
    score: number;
}
