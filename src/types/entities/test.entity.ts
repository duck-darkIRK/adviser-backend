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

    @ManyToMany(() => Subject, (subject) => subject.users)
    subjects: Subject[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ nullable: true })
    refresh_token: string;

    @Column()
    password: string;
}

class Major {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    subject: string;

    @ManyToMany(() => User, (user) => user.majors)
    @JoinTable({ name: 'learning' })
    users: User[];

    @ManyToMany(() => Subject, (subject) => subject.majors)
    subjects: Subject[];
}

class Subject {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    weight: number;

    @ManyToMany(() => User, (user) => user.subjects)
    @JoinTable({ name: 'learned' })
    users: User[];

    @ManyToMany(() => Major, (major) => major.subjects)
    @JoinTable({ name: 'in' })
    majors: Major[];

    @OneToMany(() => Subject, (subject) => subject.children)
    fathers: Subject[];

    @ManyToOne(() => Subject, (subject) => subject.fathers)
    @JoinColumn({ name: 'father' })
    children: Subject[];
}
