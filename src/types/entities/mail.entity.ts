import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { PostEntity } from './post.entity';
import { CommentEntity } from './comment.entity';
import { UserEntity } from './user.entity';

@ObjectType()
@Entity()
export class MailEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    Id: number;

    @Field()
    @Column()
    type: string;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column({ type: 'text' })
    content: string;

    @Field(() => UserEntity, { nullable: true })
    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'sender' })
    sender: UserEntity;

    @Field(() => UserEntity, { nullable: true })
    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'receiver' })
    receiver: UserEntity;

    @Field(() => MailEntity, { nullable: true })
    @ManyToOne(() => MailEntity, (mail) => mail.replyToMail)
    @JoinColumn({ name: 'replyToMail' })
    replyToMail: MailEntity;

    @Field(() => PostEntity, { nullable: true })
    @ManyToOne(() => PostEntity, (post) => post.reply)
    @JoinColumn({ name: 'replyToPost' })
    replyToPost: PostEntity;

    @Field(() => CommentEntity, { nullable: true })
    @ManyToOne(() => CommentEntity, (comment) => comment.replyMail)
    @JoinColumn({ name: 'replyToCmt' })
    replyToCmt: CommentEntity;

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;
}
