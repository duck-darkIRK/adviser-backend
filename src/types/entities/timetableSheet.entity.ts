import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { TimetableEntity } from './timetable.entity';

@ObjectType()
@Entity()
export class TimetableSheetEntity {
    @Field()
    @PrimaryGeneratedColumn()
    Id: number;

    @Field(() => Int)
    @Column()
    time: number;

    @Field(() => Int)
    @Column()
    day: number;

    @Field(() => TimetableEntity)
    @ManyToOne(() => TimetableEntity, (timetable) => timetable.sheets)
    @JoinColumn({ name: 'timetable' })
    timetable: TimetableEntity;

    @Field({ nullable: true })
    @Column({ nullable: true })
    class: string;
}
