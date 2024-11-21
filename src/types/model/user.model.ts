// user.model.ts
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { MajorQL } from './major.model';
import { TranscriptQL } from './transcript.model';
import { MailboxQL } from './mailbox.model';
import { TimetableQL } from './timetable.model';
import { NotificationQL } from './notification.model';
import { PostQL } from './post.model';
import { CommentQL } from './comment.model';
import { ClassQL } from './class.model';

@ObjectType()
export class UserQL {
    @Field(() => ID)
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

    @Field(() => [MajorQL], { nullable: true })
    majors: MajorQL[];

    @Field(() => [TranscriptQL], { nullable: true })
    transcripts: TranscriptQL[];

    @Field(() => MailboxQL, { nullable: true })
    mail: MailboxQL;

    @Field(() => [TimetableQL], { nullable: true })
    timetables: TimetableQL[];

    @Field(() => [NotificationQL], { nullable: true })
    notifications: NotificationQL[];

    @Field(() => [PostQL], { nullable: true })
    posts: PostQL[];

    @Field(() => [PostQL], { nullable: true })
    readPosts: PostQL[];

    @Field(() => [PostQL], { nullable: true })
    likedPosts: PostQL[];

    @Field(() => [ClassQL], { nullable: true })
    classes: ClassQL[];

    @Field(() => [ClassQL], { nullable: true })
    teach: ClassQL[];

    @Field(() => [CommentQL], { nullable: true })
    comments: CommentQL[];

    @Field()
    username: string;

    @Field()
    password: string;

    @Field({ nullable: true })
    refresh_token: string;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}
