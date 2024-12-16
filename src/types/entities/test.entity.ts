import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ unique: true, nullable: true })
    code: string;

    @Column()
    role: string;

    @ManyToMany(() => Major, (major) => major.users)
    majors: Major[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ nullable: true })
    refresh_token: string;

    @Column()
    password: string;

    @OneToMany(() => Transcript, (transcript) => transcript.owner)
    @JoinColumn()
    transcript: Transcript;

    @Column({ nullable: true })
    semester: string;
}

class Major {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    subject: string;

    @ManyToMany(() => User, (user) => user.majors)
    @JoinTable()
    users: User[];

    @ManyToMany(() => Subject, (subject) => subject.majors)
    subjects: Subject[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

class Subject {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    weight: number;

    @ManyToMany(() => Major, (major) => major.subjects)
    @JoinTable()
    majors: Major[];

    @OneToMany(() => Subject, (subject) => subject.children)
    fathers: Subject[];

    @ManyToOne(() => Subject, (subject) => subject.fathers)
    @JoinColumn()
    children: Subject[];

    @ManyToMany(() => Transcript, (transcript) => transcript.subjects)
    inTranscript: Subject[];

    @ManyToOne(() => Class, (classEntity) => classEntity.subject)
    inClass: Class[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

class Transcript {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(() => Subject, (subject) => subject.inTranscript)
    @JoinTable()
    subjects: Subject[];

    @ManyToOne(() => User, (user) => user.transcript)
    @JoinColumn()
    owner: User;

    @Column()
    score: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

class Class {
    @PrimaryColumn()
    id: string;

    @Column()
    semester: string;

    @Column()
    name: string;

    @Column()
    time: number;

    @Column()
    day: number;

    @ManyToOne(() => Subject, (subject) => subject.inClass)
    @JoinColumn()
    subject: Subject;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
