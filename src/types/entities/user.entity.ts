import {
    Column,
    CreateDateColumn,
    Entity,
    Generated,
    JoinColumn,
    JoinTable,
    ManyToMany,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Major } from './major.entity';
import { Transcript } from './transcript.entity';
import { Mailbox } from './mailbox.entity';
import { Timetable } from './timetable.entity';
import { Notification } from './notification.entity';
import { Post } from './post.entity';
import { Comment } from './comment.entity';
import { Class } from './class.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    Id: string;

    @Generated('increment')
    @Column({ unique: true })
    code: number;

    @Column({ nullable: true, default: 'img' })
    avatar: string;

    @Column({ default: 'A' })
    idPrefix: string;

    @Column({ default: false })
    isOnline: boolean;

    @Column({ default: false })
    isBaned: boolean;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ type: 'date', nullable: true })
    birthdate: Date;

    @Column({ unique: true, nullable: true })
    email: string;

    @Column({ unique: true, nullable: true })
    phone: string;

    @Column('simple-array', { nullable: true })
    roles: string[];
    // done
    @ManyToMany(() => Major, (major) => major.users)
    majors: Major[];
    // done
    @OneToMany(() => Transcript, (transcript) => transcript.user)
    transcripts: Transcript[];
    // done
    @OneToOne(() => Mailbox, (mailbox) => mailbox.user)
    @JoinColumn({ name: 'mailbox' })
    mail: Mailbox;
    // done
    @OneToMany(() => Timetable, (timetable) => timetable.user)
    timetables: Timetable[];
    // done
    @OneToMany(() => Notification, (notification) => notification.user)
    notifications: Notification[];
    // done
    @OneToMany(() => Post, (post) => post.user)
    posts: Post[];
    // done
    @ManyToMany(() => Post, (post) => post.reader)
    @JoinTable()
    readPosts: Post[];
    // done
    @ManyToMany(() => Post, (post) => post.likes)
    likedPosts: Post[];
    // done
    @ManyToMany(() => Class, (classEntity) => classEntity.students)
    classes: Class[];
    // done
    @ManyToMany(() => Class, (classEntity) => classEntity.teachers)
    teach: Class[];
    // done
    @OneToMany(() => Comment, (comment) => comment.user)
    comments: Comment[];

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    refresh_token: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
