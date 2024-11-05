// major.model.ts
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from './user.model';
import { Subject } from './subject.model';

@ObjectType()
export class Major {
    @Field(() => ID)
    Id: string;

    @Field(() => [User])
    users: User[];

    @Field()
    isDeleted: boolean;

    @Field()
    majorName: string;

    @Field(() => [Subject])
    subjects: Subject[];

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}
