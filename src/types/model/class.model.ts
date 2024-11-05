// class.model.ts
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { User } from './user.model';
import { Subject } from './subject.model';

@ObjectType()
export class Class {
    @Field(() => ID)
    Id: number;

    @Field()
    classCode: string;

    @Field()
    isDeleted: boolean;

    @Field(() => Int)
    size: number;

    @Field(() => [User], { nullable: true })
    students?: User[];

    @Field(() => [User], { nullable: true })
    teachers?: User[];

    @Field(() => Subject)
    subject: Subject;

    @Field({ nullable: true })
    status?: string;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}
