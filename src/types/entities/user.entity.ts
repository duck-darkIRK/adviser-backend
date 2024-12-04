import { Field, ObjectType } from '@nestjs/graphql';
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

@ObjectType()
@Entity()
export class UserEntity {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    Id: string;

    @Field()
    @Generated('increment')
    @Column({ unique: true })
    code: number;

    @Field({ nullable: true, defaultValue: 'img' })
    @Column({ nullable: true, default: 'img' })
    avatar: string;

    @Field({ defaultValue: 'A' })
    @Column({ default: 'A' })
    idPrefix: string;

    @Field({ defaultValue: false })
    @Column({ default: false })
    isOnline: boolean;

    @Field({ defaultValue: false })
    @Column({ default: false })
    isBaned: boolean;

    @Field()
    @Column()
    firstName: string;

    @Field()
    @Column()
    lastName: string;

    @Field({ nullable: true })
    @Column({ type: 'datetime', nullable: true })
    birthdate: Date;

    @Field({ nullable: true })
    @Column({ unique: true, nullable: true })
    email: string;

    @Field({ nullable: true })
    @Column({ unique: true, nullable: true })
    phone: string;

    @Field(() => [String], { nullable: true })
    @Column('simple-array', { nullable: true })
    roles: string[];

    @Field(() => [MajorEntity])
    @ManyToMany(() => MajorEntity, (major) => major.users)
    majors: MajorEntity[];

    @Field(() => [TranscriptEntity])
    @OneToMany(() => TranscriptEntity, (transcript) => transcript.user)
    transcripts: TranscriptEntity[];

    @Field(() => MailboxEntity)
    @OneToOne(() => MailboxEntity, (mailbox) => mailbox.user)
    @JoinColumn({ name: 'mailbox' })
    mail: MailboxEntity;

    @Field(() => [TimetableEntity])
    @OneToMany(() => TimetableEntity, (timetable) => timetable.user)
    timetables: TimetableEntity[];

    @Field(() => [NotificationEntity])
    @OneToMany(() => NotificationEntity, (notification) => notification.user)
    notifications: NotificationEntity[];

    @Field(() => [PostEntity])
    @OneToMany(() => PostEntity, (post) => post.user)
    posts: PostEntity[];

    @Field(() => [PostEntity])
    @ManyToMany(() => PostEntity, (post) => post.reader)
    @JoinTable()
    readPosts: PostEntity[];

    @Field(() => [PostEntity])
    @ManyToMany(() => PostEntity, (post) => post.likes)
    likedPosts: PostEntity[];

    @Field(() => [ClassEntity])
    @ManyToMany(() => ClassEntity, (classEntity) => classEntity.students)
    classes: ClassEntity[];

    @Field(() => [ClassEntity])
    @ManyToMany(() => ClassEntity, (classEntity) => classEntity.teachers)
    teach: ClassEntity[];

    @Field(() => [CommentEntity])
    @OneToMany(() => CommentEntity, (comment) => comment.user)
    comments: CommentEntity[];

    @Field()
    @Column({ unique: true })
    username: string;

    @Field()
    @Column()
    password: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    refresh_token: string;

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;
}
