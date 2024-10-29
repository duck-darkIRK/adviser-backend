import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Subject } from './subject.entity';

@Entity()
export class Class {
    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    classCode: string;

    @Column({ default: false })
    isDeleted: boolean;

    @Column({ default: 0 })
    size: number;
    // done
    @ManyToMany(() => User)
    @JoinTable()
    students: User[];
    // done
    @ManyToMany(() => User)
    @JoinTable()
    teachers: User[];
    // done
    @ManyToOne(() => Subject, (subject) => subject.classes)
    @JoinColumn({ name: 'subject' })
    subject: Subject;

    @Column({ nullable: true })
    status: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
