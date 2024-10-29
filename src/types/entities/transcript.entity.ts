import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    ManyToMany,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Subject } from './subject.entity';

@Entity()
export class Transcript {
    @PrimaryGeneratedColumn()
    Id: number;
    // done
    @ManyToOne(() => User, (user) => user.transcripts)
    @JoinColumn({ name: 'owner' })
    user: User;
    // done
    @ManyToMany(() => Subject, (subject) => subject.inTranscript)
    subject: Subject;

    @Column()
    score: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
