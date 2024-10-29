import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Timetable } from './timetable.entity';

@Entity()
export class TimetableSheet {
    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    time: number;

    @Column()
    day: number;
    // done
    @ManyToOne(() => Timetable, (timetable) => timetable.sheets)
    @JoinColumn({ name: 'timetable' })
    timetable: Timetable;

    @Column({ nullable: true })
    class: string;
}
