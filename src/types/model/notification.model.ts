// notification.model.ts
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from './user.model';
import { Comment } from './comment.model';
import { Mail } from './mail.model';

@ObjectType()
export class Notification {
    @Field(() => ID)
    Id: number;

    @Field()
    isPin: boolean;

    @Field()
    isDeleted: boolean;

    @Field()
    isRead: boolean;

    @Field(() => Comment, { nullable: true })
    comment?: Comment;

    @Field(() => Mail, { nullable: true })
    mail?: Mail;

    @Field(() => User)
    user: User;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}
