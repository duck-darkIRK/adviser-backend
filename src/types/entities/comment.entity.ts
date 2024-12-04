import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { PostEntity } from './post.entity';
import { UserEntity } from './user.entity';
import { MailEntity } from './mail.entity';

@ObjectType()
@Entity()
export class CommentEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    Id: number;

    @Field(() => UserEntity)
    @ManyToOne(() => UserEntity, (user) => user.comments)
    @JoinColumn({ name: 'user' })
    user: UserEntity;

    @Field()
    @Column({ type: 'text' })
    content: string;

    @Field(() => PostEntity, { nullable: true })
    @ManyToOne(() => PostEntity, (post) => post.comments, { nullable: true })
    @JoinColumn({ name: 'comment' })
    post: PostEntity;

    @Field(() => CommentEntity, { nullable: true })
    @ManyToOne(() => CommentEntity, (comment) => comment.replies, {
        nullable: true,
    })
    @JoinColumn({ name: 'replyCmt' })
    reply: CommentEntity;

    @Field(() => [CommentEntity], { nullable: true })
    @OneToMany(() => CommentEntity, (comment) => comment.reply)
    replies: CommentEntity[];

    @Field(() => [UserEntity], { nullable: true })
    @ManyToMany(() => UserEntity, (user) => user.likedPosts)
    @JoinTable()
    likes: UserEntity[];

    @Field(() => [MailEntity], { nullable: true })
    @OneToMany(() => MailEntity, (mail) => mail.replyToCmt)
    replyMail: MailEntity[];

    @Field(() => Date)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => Date)
    @UpdateDateColumn()
    updatedAt: Date;
}
