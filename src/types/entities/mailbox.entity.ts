import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { MailEntity } from './mail.entity';

@ObjectType()
@Entity()
export class MailboxEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    Id: number;

    @Field(() => UserEntity)
    @OneToOne(() => UserEntity, (user) => user.mail)
    user: UserEntity;

    @Field()
    @Column({ default: false })
    isDeleted: boolean;

    @Field(() => [MailEntity], { nullable: true })
    @Column('simple-array', { nullable: true })
    mailsCome: MailEntity[];

    @Field(() => [MailEntity], { nullable: true })
    @Column('simple-array', { nullable: true })
    mailsTo: MailEntity[];

    @Field(() => Date)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => Date)
    @UpdateDateColumn()
    updatedAt: Date;
}
