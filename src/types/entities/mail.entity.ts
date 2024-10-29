import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Post } from './post.entity';
import { Comment } from './comment.entity';
import { User } from './user.entity';

@Entity()
export class Mail {
    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    type: string;

    @Column()
    name: string;

    @Column({ type: 'text' })
    content: string;
    // done
    @OneToOne(() => User)
    @JoinColumn({ name: 'sender' })
    sender: User;
    // done
    @OneToOne(() => User)
    @JoinColumn({ name: 'receiver' })
    receiver: User;
    // done
    @ManyToOne(() => Mail, (mail) => mail.replyToMail)
    @JoinColumn({ name: 'replyToMail' })
    replyToMail: Mail;
    // done
    @ManyToOne(() => Post, (post) => post.reply)
    @JoinColumn({ name: 'replyToPost' })
    replyToPost: Post;
    // done
    @ManyToOne(() => Comment, (comment) => comment.replyMail)
    @JoinColumn({ name: 'replyToCmt' })
    replyToCmt: Comment;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
