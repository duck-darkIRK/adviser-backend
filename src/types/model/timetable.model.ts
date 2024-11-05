// timetable.model.ts
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from './user.model';
import { TimetableSheet } from './timetableSheet.model';

@ObjectType()
export class Timetable {
    @Field(() => ID)
    Id: number;

    @Field(() => User)
    user: User;

    @Field(() => [TimetableSheet])
    sheets: TimetableSheet[];

    @Field()
    isDeleted: boolean;

    @Field()
    semester: number;

    @Field()
    year: number;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}
