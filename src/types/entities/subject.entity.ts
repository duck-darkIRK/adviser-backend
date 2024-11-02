import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Class } from './class.entity';
import { Transcript } from './transcript.entity';
import { Major } from './major.entity';

0;

@Entity()
export class Subject {
    @PrimaryColumn()
    Id: string;

    @Column()
    subjectName: string;

    @Column({ default: false })
    isDeleted: boolean;
    // done
    @OneToMany(() => Class, (classEntity) => classEntity.subject)
    classes: Class[];
    // done
    @ManyToMany(() => Transcript, (transcript) => transcript.subject)
    @JoinTable()
    inTranscript: Transcript[];
    // done
    @ManyToMany(() => Major, (major) => major.subjects)
    majors: Major[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
