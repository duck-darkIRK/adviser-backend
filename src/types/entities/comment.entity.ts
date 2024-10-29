import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Post } from './post.entity';
import { User } from './user.entity';
import { Mail } from './mail.entity';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    Id: number;
    // done
    @ManyToOne(() => User, (user) => user.comments)
    @JoinColumn({ name: 'user' })
    user: User;

    @Column({ type: 'text' })
    content: string;
    // done
    @ManyToOne(() => Post, (post) => post.comments)
    @JoinColumn({ name: 'comment' })
    post: Post;
    // done
    @ManyToOne(() => Comment, (comment) => comment.replies)
    @JoinColumn({ name: 'replyCmt' })
    reply: Comment;
    // done ???
    @OneToMany(() => Comment, (comment) => comment.reply)
    replies: Comment[];
    // done
    @ManyToMany(() => User, (user) => user.likedPosts)
    @JoinTable()
    likes: User[];
    // done
    @OneToMany(() => Mail, (mail) => mail.replyToCmt)
    replyMail: Mail[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
