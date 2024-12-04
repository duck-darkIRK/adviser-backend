import { Field, Float, ObjectType } from '@nestjs/graphql';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { SubjectEntity } from './subject.entity';

@ObjectType()
@Entity()
export class TranscriptEntity {
    @Field()
    @PrimaryGeneratedColumn()
    Id: number;

    @Field(() => UserEntity)
    @ManyToOne(() => UserEntity, (user) => user.transcripts)
    @JoinColumn({ name: 'owner' })
    user: UserEntity;

    @Field(() => [SubjectEntity])
    @ManyToMany(() => SubjectEntity, (subject) => subject.inTranscript)
    subject: SubjectEntity;

    @Field(() => Float)
    @Column()
    score: number;

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;
}
