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

@Entity()
export class ClassEntity {
    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    classCode: string;

    @Column({ default: false })
    isDeleted: boolean;

    @Column({ default: 0 })
    size: number;
    // done
    @ManyToMany(() => UserEntity)
    @JoinTable()
    students: UserEntity[];
    // done
    @ManyToMany(() => UserEntity)
    @JoinTable()
    teachers: UserEntity[];
    // done
    @ManyToOne(() => SubjectEntity, (subject) => subject.classes)
    @JoinColumn({ name: 'subject' })
    subject: SubjectEntity;

    @Column({ nullable: true })
    status: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
