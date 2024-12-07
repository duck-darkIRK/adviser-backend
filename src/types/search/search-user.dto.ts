import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SearchUserDto {
    @Field({ nullable: true })
    firstName?: string;

    @Field({ nullable: true })
    lastName?: string;

    @Field({ nullable: true })
    email?: string;

    @Field({ nullable: true })
    isOnline?: boolean;

    @Field({ nullable: true })
    isBaned?: boolean;

    @Field(() => [String], { nullable: true })
    roles?: string[];

    @Field(() => [String], { nullable: true })
    relations?: string[];
}
