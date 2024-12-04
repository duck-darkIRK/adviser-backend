import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { SubjectEntity } from './subject.entity';

@ObjectType()
@Entity()
export class ClassEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    Id: number;

    @Field()
    @Column()
    classCode: string;

    @Field()
    @Column({ default: false })
    isDeleted: boolean;

    @Field(() => Int)
    @Column({ default: 0 })
    size: number;

    @Field(() => [UserEntity])
    @ManyToMany(() => UserEntity)
    @JoinTable()
    students: UserEntity[];

    @Field(() => [UserEntity])
    @ManyToMany(() => UserEntity)
    @JoinTable()
    teachers: UserEntity[];

    @Field(() => SubjectEntity)
    @ManyToOne(() => SubjectEntity, (subject) => subject.classes)
    @JoinColumn({ name: 'subject' })
    subject: SubjectEntity;

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
