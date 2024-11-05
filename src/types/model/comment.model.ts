// comment.model.ts
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from './user.model';
import { Post } from './post.model';
import { Mail } from './mail.model';

@ObjectType()
export class Comment {
    @Field(() => ID)
    Id: number;

    @Field(() => User)
    user: User;

    @Field()
    content: string;

    @Field(() => Post, { nullable: true })
    post?: Post;

    @Field(() => Comment, { nullable: true })
    reply?: Comment;

    @Field(() => [Comment], { nullable: true })
    replies?: Comment[];

    @Field(() => [User], { nullable: true })
    likes?: User[];

    @Field(() => [Mail], { nullable: true })
    replyMail?: Mail[];

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}
