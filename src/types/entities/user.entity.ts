import { Field, HideField, ObjectType } from '@nestjs/graphql';
import {
    Column,
    CreateDateColumn,
    Entity,
    Generated,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
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
import { GroupEntity } from './group.entity';

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

    @Field(() => [MajorEntity], { nullable: true })
    @ManyToMany(() => MajorEntity, (major) => major.users)
    majors: MajorEntity[];

    @Field(() => [TranscriptEntity], { nullable: true })
    @OneToMany(() => TranscriptEntity, (transcript) => transcript.user)
    transcripts: TranscriptEntity[];

    @Field(() => [MailEntity], { nullable: true })
    @OneToMany(() => MailEntity, (mail) => mail.sender)
    send: MailEntity[];

    @Field(() => [MailEntity], { nullable: true })
    @OneToMany(() => MailEntity, (mail) => mail.receiver)
    receive: MailEntity[];

    @Field(() => [TimetableEntity], { nullable: true })
    @OneToMany(() => TimetableEntity, (timetable) => timetable.user)
    timetables: TimetableEntity[];

    @Field(() => [NotificationEntity], { nullable: true })
    @OneToMany(() => NotificationEntity, (notification) => notification.user)
    notifications: NotificationEntity[];

    @Field(() => [PostEntity], { nullable: true })
    @OneToMany(() => PostEntity, (post) => post.user)
    posts: PostEntity[];

    @Field(() => [PostEntity], { nullable: true })
    @ManyToMany(() => PostEntity, (post) => post.reader)
    @JoinTable()
    readPosts: PostEntity[];

    @Field(() => [PostEntity], { nullable: true })
    @ManyToMany(() => PostEntity, (post) => post.likes)
    @JoinTable()
    likedPosts: PostEntity[];

    @Field(() => [ClassEntity], { nullable: true })
    @ManyToMany(() => ClassEntity, (classEntity) => classEntity.students)
    classes: ClassEntity[];

    @Field(() => [ClassEntity], { nullable: true })
    @ManyToMany(() => ClassEntity, (classEntity) => classEntity.teachers)
    teach: ClassEntity[];

    @Field(() => [CommentEntity], { nullable: true })
    @OneToMany(() => CommentEntity, (comment) => comment.user)
    comments: CommentEntity[];

    @Field(() => GroupEntity, { nullable: true })
    @ManyToOne(() => GroupEntity, (group) => group.students)
    @JoinColumn()
    groups: GroupEntity;

    @Field(() => [GroupEntity], { nullable: true })
    @ManyToMany(() => GroupEntity, (group) => group.advisers)
    adviserOf: GroupEntity[];

    @Field()
    @Column({ unique: true })
    username: string;

    @HideField()
    // @Field()
    @Column()
    password: string;

    @HideField()
    // @Field({ nullable: true })
    @Column({ nullable: true })
    refresh_token: string;

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;
}
