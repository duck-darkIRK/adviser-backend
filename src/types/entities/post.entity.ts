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
import { CommentEntity } from './comment.entity';
import { UserEntity } from './user.entity';
import { MailEntity } from './mail.entity';

@ObjectType()
@Entity()
export class PostEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    Id: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    title: string;

    @Field({ nullable: true })
    @Column({ type: 'text', nullable: true })
    content: string;

    @Field(() => [String], { nullable: true })
    @Column({ nullable: true, type: 'simple-array' })
    image: string[];

    @Field(() => [CommentEntity])
    @OneToMany(() => CommentEntity, (comment) => comment.post)
    comments: CommentEntity[];

    @Field(() => [UserEntity])
    @ManyToMany(() => UserEntity, (user) => user.likedPosts)
    @JoinTable()
    likes: UserEntity[];

    @Field(() => UserEntity)
    @ManyToOne(() => UserEntity, (user) => user.posts)
    @JoinColumn({ name: 'owner' })
    user: UserEntity;

    @Field(() => [UserEntity])
    @ManyToMany(() => UserEntity, (user) => user.readPosts)
    reader: UserEntity[];

    @Field(() => [MailEntity])
    @OneToMany(() => MailEntity, (mail) => mail.replyToPost)
    reply: MailEntity[];

    @Field(() => Date)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => Date)
    @UpdateDateColumn()
    updatedAt: Date;
}
