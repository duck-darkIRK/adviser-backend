// notification.input.ts
import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { UserInput } from './user.input'; // Giả sử bạn đã có UserInput
import { CommentInput } from './comment.input'; // Giả sử bạn đã có CommentInput
import { MailInput } from './mail.input'; // Giả sử bạn đã có MailInput

@InputType()
export class NotificationInput {
    @Field()
    @IsBoolean()
    isPin: boolean;

    @Field()
    @IsBoolean()
    isDeleted: boolean;

    @Field()
    @IsBoolean()
    isRead: boolean;

    @Field(() => CommentInput, { nullable: true })
    @IsOptional()
    @Type(() => CommentInput)
    comment?: CommentInput;

    @Field(() => MailInput, { nullable: true })
    @IsOptional()
    @Type(() => MailInput)
    mail?: MailInput;

    @Field(() => UserInput)
    @Type(() => UserInput)
    user: UserInput;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}
