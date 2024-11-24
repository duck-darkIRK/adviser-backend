import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { TimetableEntity } from './timetable.entity';

@Entity()
export class TimetableSheetEntity {
    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    time: number;

    @Column()
    day: number;
    // done
    @ManyToOne(() => TimetableEntity, (timetable) => timetable.sheets)
    @JoinColumn({ name: 'timetable' })
    timetable: TimetableEntity;

    @Column({ nullable: true })
    class: string;
}
