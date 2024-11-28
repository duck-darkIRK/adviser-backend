// mailbox.input.ts
import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { UserInput } from './user.input'; // Giả sử bạn đã có UserInput
import { MailInput } from './mail.input'; // Giả sử bạn đã có MailInput

@InputType()
export class MailboxInput {
    @Field()
    @IsNotEmpty()
    isDeleted: boolean;

    @Field(() => UserInput)
    @IsNotEmpty()
    @Type(() => UserInput)
    user: UserInput;

    @Field(() => [MailInput], { nullable: true })
    @Type(() => MailInput)
    mailsCome?: MailInput[];

    @Field(() => [MailInput], { nullable: true })
    @Type(() => MailInput)
    mailsTo?: MailInput[];

    @Field()
    @IsNotEmpty()
    createdAt: Date;

    @Field()
    @IsNotEmpty()
    updatedAt: Date;
}
