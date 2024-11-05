// subject.model.ts
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Class } from './class.model';
import { Transcript } from './transcript.model';
import { Major } from './major.model';

@ObjectType()
export class Subject {
    @Field(() => ID)
    Id: string;

    @Field()
    subjectName: string;

    @Field()
    isDeleted: boolean;

    @Field(() => [Class])
    classes: Class[];

    @Field(() => [Transcript], { nullable: true })
    inTranscript?: Transcript[];

    @Field(() => [Major])
    majors: Major[];

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}
