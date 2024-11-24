import {
    Column,
    CreateDateColumn,
    Entity,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { MailEntity } from './mail.entity';

@Entity()
export class MailboxEntity {
    @PrimaryGeneratedColumn()
    Id: number;
    // done
    @OneToOne(() => UserEntity, (user) => user.mail)
    user: UserEntity;

    @Column({ default: false })
    isDeleted: boolean;

    @Column('simple-array', { nullable: true })
    mailsCome: MailEntity[];

    @Column('simple-array', { nullable: true })
    mailsTo: MailEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
