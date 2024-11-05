// mail.model.ts
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from './user.model';
import { Post } from './post.model';
import { Comment } from './comment.model';

@ObjectType()
export class Mail {
    @Field(() => ID)
    Id: number;

    @Field()
    type: string;

    @Field()
    name: string;

    @Field()
    content: string;

    @Field(() => User)
    sender: User;

    @Field(() => User)
    receiver: User;

    @Field(() => Mail, { nullable: true })
    replyToMail?: Mail;

    @Field(() => Post, { nullable: true })
    replyToPost?: Post;

    @Field(() => Comment, { nullable: true })
    replyToCmt?: Comment;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}
