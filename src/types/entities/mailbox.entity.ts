import {
    Column,
    CreateDateColumn,
    Entity,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Mail } from './mail.entity';

@Entity()
export class Mailbox {
    @PrimaryGeneratedColumn()
    Id: number;
    // done
    @OneToOne(() => User, (user) => user.mail)
    user: User;

    @Column({ default: false })
    isDeleted: boolean;

    @Column('simple-array', { nullable: true })
    mailsCome: Mail[];

    @Column('simple-array', { nullable: true })
    mailsTo: Mail[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
