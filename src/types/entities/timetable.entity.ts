import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { TimetableSheet } from './timetableSheet.entity';

@Entity()
export class Timetable {
    @PrimaryGeneratedColumn()
    Id: number;
    // done
    @ManyToOne(() => User, (user) => user.timetables)
    @JoinColumn({ name: 'owner' })
    user: User;
    // done
    @OneToMany(() => TimetableSheet, (sheet) => sheet.timetable)
    sheets: TimetableSheet[];

    @Column({ default: false })
    isDeleted: boolean;

    @Column()
    semester: number;

    @Column()
    year: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
