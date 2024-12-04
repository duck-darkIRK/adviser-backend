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
import { UserEntity } from './user.entity';
import { CommentEntity } from './comment.entity';
import { MailEntity } from './mail.entity';

@ObjectType()
@Entity()
export class NotificationEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    Id: number;

    @Field()
    @Column({ default: false })
    isPin: boolean;

    @Field()
    @Column({ default: false })
    isDeleted: boolean;

    @Field()
    @Column({ default: false })
    isRead: boolean;

    @Field(() => CommentEntity, { nullable: true })
    @ManyToOne(() => CommentEntity)
    @JoinColumn({ name: 'comment' })
    comment: CommentEntity;

    @Field(() => MailEntity, { nullable: true })
    @ManyToOne(() => MailEntity)
    @JoinColumn({ name: 'mail' })
    mail: MailEntity;

    @Field(() => UserEntity)
    @ManyToOne(() => UserEntity, (user) => user.notifications)
    @JoinColumn({ name: 'owner' })
    user: UserEntity;

    @Field(() => Date)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => Date)
    @UpdateDateColumn()
    updatedAt: Date;
}
