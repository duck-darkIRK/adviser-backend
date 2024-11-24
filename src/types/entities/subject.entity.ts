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
import { ClassEntity } from './class.entity';
import { TranscriptEntity } from './transcript.entity';
import { MajorEntity } from './major.entity';

@Entity()
export class SubjectEntity {
    @PrimaryColumn()
    Id: string;

    @Column()
    subjectName: string;

    @Column({ default: false })
    isDeleted: boolean;
    // done
    @OneToMany(() => ClassEntity, (classEntity) => classEntity.subject)
    classes: ClassEntity[];
    // done
    @ManyToMany(() => TranscriptEntity, (transcript) => transcript.subject)
    @JoinTable()
    inTranscript: TranscriptEntity[];
    // done
    @ManyToMany(() => MajorEntity, (major) => major.subjects)
    majors: MajorEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
