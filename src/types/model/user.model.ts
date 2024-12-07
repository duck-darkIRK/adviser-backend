// user.model.ts
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Major } from './major.model';
import { Transcript } from './transcript.model';
import { Timetable } from './timetable.model';
import { Notification } from './notification.model';
import { Post } from './post.model';
import { Comment } from './comment.model';
import { Class } from './class.model';

@ObjectType()
export class User {
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

    @Field(() => [Major], { nullable: true })
    majors: Major[];

    @Field(() => [Transcript], { nullable: true })
    transcripts: Transcript[];

    @Field(() => [Timetable], { nullable: true })
    timetables: Timetable[];

    @Field(() => [Notification], { nullable: true })
    notifications: Notification[];

    @Field(() => [Post], { nullable: true })
    posts: Post[];

    @Field(() => [Post], { nullable: true })
    readPosts: Post[];

    @Field(() => [Post], { nullable: true })
    likedPosts: Post[];

    @Field(() => [Class], { nullable: true })
    classes: Class[];

    @Field(() => [Class], { nullable: true })
    teach: Class[];

    @Field(() => [Comment], { nullable: true })
    comments: Comment[];

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
