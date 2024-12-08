import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@ObjectType()
@Entity()
export class GroupEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    Id: number;

    @Field()
    @Column()
    classCode: string;

    @Field()
    @Column({ default: false })
    isDeleted: boolean;

    @Field(() => [UserEntity])
    @OneToMany(() => UserEntity, (user) => user.groups)
    students: UserEntity[];

    @Field(() => [UserEntity])
    @ManyToMany(() => UserEntity, (user) => user.adviserOf)
    @JoinTable()
    advisers: UserEntity[];

    @Field({ nullable: true })
    @Column({ nullable: true })
    status: string;

    @Field(() => Date)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => Date)
    @UpdateDateColumn()
    updatedAt: Date;
}
