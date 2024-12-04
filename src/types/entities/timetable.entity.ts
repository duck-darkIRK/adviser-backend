import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { TimetableSheetEntity } from './timetableSheet.entity';

@ObjectType()
@Entity()
export class TimetableEntity {
    @Field()
    @PrimaryGeneratedColumn()
    Id: number;

    @Field(() => UserEntity)
    @ManyToOne(() => UserEntity, (user) => user.timetables)
    @JoinColumn({ name: 'owner' })
    user: UserEntity;

    @Field(() => [TimetableSheetEntity])
    @OneToMany(() => TimetableSheetEntity, (sheet) => sheet.timetable)
    sheets: TimetableSheetEntity[];

    @Field()
    @Column({ default: false })
    isDeleted: boolean;

    @Field(() => Int)
    @Column()
    semester: number;

    @Field(() => Int)
    @Column()
    year: number;

    @Field(() => Date)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => Date)
    @UpdateDateColumn()
    updatedAt: Date;
}
