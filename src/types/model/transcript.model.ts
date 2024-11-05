// transcript.model.ts
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from './user.model';
import { Subject } from './subject.model';

@ObjectType()
export class Transcript {
    @Field(() => ID)
    Id: number;

    @Field(() => User)
    user: User;

    @Field(() => Subject)
    subject: Subject;

    @Field()
    score: number;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}
