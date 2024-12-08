import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SearchUserOptionDto {
    @Field({ nullable: true })
    majors?: boolean;
    @Field({ nullable: true })
    transcripts?: boolean;
    @Field({ nullable: true })
    send?: boolean;
    @Field({ nullable: true })
    receive?: boolean;
    @Field({ nullable: true })
    timetables?: boolean;
    @Field({ nullable: true })
    notifications?: boolean;
    @Field({ nullable: true })
    posts?: boolean;
    @Field({ nullable: true })
    readPosts?: boolean;
    @Field({ nullable: true })
    classes?: boolean;
    @Field({ nullable: true })
    teach?: boolean;
    @Field({ nullable: true })
    comments?: boolean;

    constructor(init?: Partial<SearchUserOptionDto>) {
        Object.assign(this, init);
    }
}
