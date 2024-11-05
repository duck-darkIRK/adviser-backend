// post.model.ts
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Comment } from './comment.model';
import { User } from './user.model';
import { Mail } from './mail.model';

@ObjectType()
export class Post {
    @Field(() => ID)
    Id: number;

    @Field({ nullable: true })
    title?: string;

    @Field({ nullable: true })
    content?: string;

    @Field(() => [String], { nullable: 'items' })
    image?: string[];

    @Field(() => [Comment])
    comments: Comment[];

    @Field(() => [User])
    likes: User[];

    @Field(() => User)
    user: User;

    @Field(() => [User])
    reader: User[];

    @Field(() => [Mail])
    reply: Mail[];

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}
