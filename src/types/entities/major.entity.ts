import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Subject } from './subject.entity';
import { User } from './user.entity';

@Entity()
export class Major {
    @PrimaryColumn()
    Id: string;
    // done
    @ManyToMany(() => User, (user) => user.majors)
    @JoinTable()
    users: User[];

    @Column({ default: false })
    isDeleted: boolean;

    @Column()
    majorName: string;
    //done
    @ManyToMany(() => Subject)
    @JoinTable()
    subjects: Subject[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
