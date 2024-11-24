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
import { MajorEntity } from './major.entity';
import { TranscriptEntity } from './transcript.entity';
import { MailboxEntity } from './mailbox.entity';
import { TimetableEntity } from './timetable.entity';
import { NotificationEntity } from './notification.entity';
import { PostEntity } from './post.entity';
import { CommentEntity } from './comment.entity';
import { ClassEntity } from './class.entity';

@Entity()
export class UserEntity {
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

    @Column({ type: 'datetime', nullable: true })
    birthdate: Date;

    @Column({ unique: true, nullable: true })
    email: string;

    @Column({ unique: true, nullable: true })
    phone: string;

    @Column('simple-array', { nullable: true })
    roles: string[];
    // done
    @ManyToMany(() => MajorEntity, (major) => major.users)
    majors: MajorEntity[];
    // done
    @OneToMany(() => TranscriptEntity, (transcript) => transcript.user)
    transcripts: TranscriptEntity[];
    // done
    @OneToOne(() => MailboxEntity, (mailbox) => mailbox.user)
    @JoinColumn({ name: 'mailbox' })
    mail: MailboxEntity;
    // done
    @OneToMany(() => TimetableEntity, (timetable) => timetable.user)
    timetables: TimetableEntity[];
    // done
    @OneToMany(() => NotificationEntity, (notification) => notification.user)
    notifications: NotificationEntity[];
    // done
    @OneToMany(() => PostEntity, (post) => post.user)
    posts: PostEntity[];
    // done
    @ManyToMany(() => PostEntity, (post) => post.reader)
    @JoinTable()
    readPosts: PostEntity[];
    // done
    @ManyToMany(() => PostEntity, (post) => post.likes)
    likedPosts: PostEntity[];
    // done
    @ManyToMany(() => ClassEntity, (classEntity) => classEntity.students)
    classes: ClassEntity[];
    // done
    @ManyToMany(() => ClassEntity, (classEntity) => classEntity.teachers)
    teach: ClassEntity[];
    // done
    @OneToMany(() => CommentEntity, (comment) => comment.user)
    comments: CommentEntity[];

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
