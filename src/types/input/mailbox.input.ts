import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateUserInput, UpdateUserInput } from './user.input';
import { CreateMailInput, UpdateMailInput } from './mail.input';

@InputType()
export class CreateMailboxInput {
    @Field()
    @IsNotEmpty()
    @IsBoolean()
    isDeleted: boolean;

    @Field(() => CreateUserInput)
    @IsNotEmpty()
    @Type(() => CreateUserInput)
    user: CreateUserInput;

    @Field(() => [CreateMailInput], { nullable: true })
    @IsOptional()
    @Type(() => CreateMailInput)
    mailsCome?: CreateMailInput[];

    @Field(() => [CreateMailInput], { nullable: true })
    @IsOptional()
    @Type(() => CreateMailInput)
    mailsTo?: CreateMailInput[];
}

@InputType()
export class UpdateMailboxInput {
    @Field()
    @IsNotEmpty()
    id: string; // Assuming id is a string, update as needed

    @Field({ nullable: true })
    @IsOptional()
    @IsBoolean()
    isDeleted?: boolean;

    @Field(() => UpdateUserInput, { nullable: true })
    @IsOptional()
    @Type(() => UpdateUserInput)
    user?: UpdateUserInput;

    @Field(() => [UpdateMailInput], { nullable: true })
    @IsOptional()
    @Type(() => UpdateMailInput)
    mailsCome?: UpdateMailInput[];

    @Field(() => [UpdateMailInput], { nullable: true })
    @IsOptional()
    @Type(() => UpdateMailInput)
    mailsTo?: UpdateMailInput[];
}

@InputType()
export class SearchMailboxInput {
    @Field()
    @IsNotEmpty()
    id: string; // Assuming id is a string, update as needed
}
