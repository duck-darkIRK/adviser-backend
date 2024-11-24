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

@Entity()
export class MajorEntity {
    @PrimaryColumn()
    Id: string;
    // done
    @ManyToMany(() => UserEntity, (user) => user.majors)
    @JoinTable()
    users: UserEntity[];

    @Column({ default: false })
    isDeleted: boolean;

    @Column()
    majorName: string;
    //done
    @ManyToMany(() => SubjectEntity)
    @JoinTable()
    subjects: SubjectEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
