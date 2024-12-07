import { Field, ObjectType } from '@nestjs/graphql';
import {
    Column,
    CreateDateColumn,
    Entity,
    Generated,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { MajorEntity } from './major.entity';
import { TranscriptEntity } from './transcript.entity';
import { TimetableEntity } from './timetable.entity';
import { NotificationEntity } from './notification.entity';
import { PostEntity } from './post.entity';
import { CommentEntity } from './comment.entity';
import { ClassEntity } from './class.entity';
import { MailEntity } from './mail.entity';

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

    @Field(() => [MailEntity])
    @OneToMany(() => MailEntity, (mail) => mail.sender)
    send: MailEntity[];

    @Field(() => [MailEntity])
    @OneToMany(() => MailEntity, (mail) => mail.receiver)
    receive: MailEntity[];

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

@ObjectType()
export class SafeUserEntity {
    @Field()
    Id: string;

    @Field()
    code: number;

    @Field({ nullable: true })
    avatar: string;

    @Field()
    idPrefix: string;

    @Field()
    isOnline: boolean;

    @Field()
    isBaned: boolean;

    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field({ nullable: true })
    birthdate: Date;

    @Field({ nullable: true })
    email: string;

    @Field({ nullable: true })
    phone: string;

    @Field(() => [String], { nullable: true })
    roles: string[];

    @Field(() => [MajorEntity])
    majors: MajorEntity[];

    @Field(() => [TranscriptEntity])
    transcripts: TranscriptEntity[];

    @Field(() => [TimetableEntity])
    timetables: TimetableEntity[];

    @Field(() => [NotificationEntity])
    notifications: NotificationEntity[];

    @Field(() => [PostEntity])
    posts: PostEntity[];

    @Field(() => [PostEntity])
    readPosts: PostEntity[];

    @Field(() => [PostEntity])
    likedPosts: PostEntity[];

    @Field(() => [ClassEntity])
    classes: ClassEntity[];

    @Field(() => [ClassEntity])
    teach: ClassEntity[];

    @Field(() => [CommentEntity])
    comments: CommentEntity[];

    @Field()
    username: string;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}
