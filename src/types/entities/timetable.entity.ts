import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { TimetableSheetEntity } from './timetableSheet.entity';

@Entity()
export class TimetableEntity {
    @PrimaryGeneratedColumn()
    Id: number;
    // done
    @ManyToOne(() => UserEntity, (user) => user.timetables)
    @JoinColumn({ name: 'owner' })
    user: UserEntity;
    // done
    @OneToMany(() => TimetableSheetEntity, (sheet) => sheet.timetable)
    sheets: TimetableSheetEntity[];

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
