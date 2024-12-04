import { Field, ObjectType } from '@nestjs/graphql';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';
import { ClassEntity } from './class.entity';
import { TranscriptEntity } from './transcript.entity';
import { MajorEntity } from './major.entity';

@ObjectType()
@Entity()
export class SubjectEntity {
    @Field()
    @PrimaryColumn()
    Id: string;

    @Field()
    @Column()
    subjectName: string;

    @Field()
    @Column({ default: false })
    isDeleted: boolean;

    @Field(() => [ClassEntity])
    @OneToMany(() => ClassEntity, (classEntity) => classEntity.subject)
    classes: ClassEntity[];

    @Field(() => [TranscriptEntity])
    @ManyToMany(() => TranscriptEntity, (transcript) => transcript.subject)
    @JoinTable()
    inTranscript: TranscriptEntity[];

    @Field(() => [MajorEntity])
    @ManyToMany(() => MajorEntity, (major) => major.subjects)
    majors: MajorEntity[];

    @Field(() => Date)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => Date)
    @UpdateDateColumn()
    updatedAt: Date;
}
