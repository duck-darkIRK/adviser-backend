// mailbox.model.ts
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from './user.model';
import { Mail } from './mail.model';

@ObjectType()
export class Mailbox {
    @Field(() => ID)
    Id: number;

    @Field(() => User)
    user: User;

    @Field()
    isDeleted: boolean;

    @Field(() => [Mail], { nullable: true })
    mailsCome?: Mail[];

    @Field(() => [Mail], { nullable: true })
    mailsTo?: Mail[];

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}
