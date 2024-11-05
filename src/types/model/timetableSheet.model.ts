// timetableSheet.model.ts
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Timetable } from './timetable.model';

@ObjectType()
export class TimetableSheet {
    @Field(() => ID)
    Id: number;

    @Field()
    time: number;

    @Field()
    day: number;

    @Field(() => Timetable)
    timetable: Timetable;

    @Field({ nullable: true })
    class?: string;
}
