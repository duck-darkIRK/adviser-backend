import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { CommentEntity } from './comment.entity';
import { MailEntity } from './mail.entity';

@Entity()
export class NotificationEntity {
    @PrimaryGeneratedColumn()
    Id: number;

    @Column({ default: false })
    isPin: boolean;

    @Column({ default: false })
    isDeleted: boolean;

    @Column({ default: false })
    isRead: boolean;
    // done
    @ManyToOne(() => CommentEntity)
    @JoinColumn({ name: 'comment' })
    comment: CommentEntity;
    // done
    @ManyToOne(() => MailEntity)
    @JoinColumn({ name: 'mail' })
    mail: MailEntity;
    // done
    @ManyToOne(() => UserEntity, (user) => user.notifications)
    @JoinColumn({ name: 'owner' })
    user: UserEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
