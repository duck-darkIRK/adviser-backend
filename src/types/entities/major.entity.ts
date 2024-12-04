import { Field, ObjectType } from '@nestjs/graphql';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';
import { SubjectEntity } from './subject.entity';
import { UserEntity } from './user.entity';

@ObjectType()
@Entity()
export class MajorEntity {
    @Field()
    @PrimaryColumn()
    Id: string;

    @Field(() => [UserEntity])
    @ManyToMany(() => UserEntity, (user) => user.majors)
    @JoinTable()
    users: UserEntity[];

    @Field()
    @Column({ default: false })
    isDeleted: boolean;

    @Field()
    @Column()
    majorName: string;

    @Field(() => [SubjectEntity])
    @ManyToMany(() => SubjectEntity, (subject) => subject.majors)
    @JoinTable()
    subjects: SubjectEntity[];

    @Field(() => Date)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => Date)
    @UpdateDateColumn()
    updatedAt: Date;
}
