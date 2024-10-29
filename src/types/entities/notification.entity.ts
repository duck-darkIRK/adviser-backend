import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Comment } from './comment.entity';
import { Mail } from './mail.entity';

@Entity()
export class Notification {
    @PrimaryGeneratedColumn()
    Id: number;

    @Column({ default: false })
    isPin: boolean;

    @Column({ default: false })
    isDeleted: boolean;

    @Column({ default: false })
    isRead: boolean;
    // done
    @ManyToOne(() => Comment)
    @JoinColumn({ name: 'comment' })
    comment: Comment;
    // done
    @ManyToOne(() => Mail)
    @JoinColumn({ name: 'mail' })
    mail: Mail;
    // done
    @ManyToOne(() => User, (user) => user.notifications)
    @JoinColumn({ name: 'owner' })
    user: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
