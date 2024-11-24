import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { SubjectEntity } from './subject.entity';

@Entity()
export class TranscriptEntity {
    @PrimaryGeneratedColumn()
    Id: number;
    // done
    @ManyToOne(() => UserEntity, (user) => user.transcripts)
    @JoinColumn({ name: 'owner' })
    user: UserEntity;
    // done
    @ManyToMany(() => SubjectEntity, (subject) => subject.inTranscript)
    subject: SubjectEntity;

    @Column()
    score: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
