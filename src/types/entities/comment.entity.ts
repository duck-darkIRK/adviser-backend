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
import { PostEntity } from './post.entity';
import { UserEntity } from './user.entity';
import { MailEntity } from './mail.entity';

@Entity()
export class CommentEntity {
    @PrimaryGeneratedColumn()
    Id: number;
    // done
    @ManyToOne(() => UserEntity, (user) => user.comments)
    @JoinColumn({ name: 'user' })
    user: UserEntity;

    @Column({ type: 'text' })
    content: string;
    // done
    @ManyToOne(() => PostEntity, (post) => post.comments)
    @JoinColumn({ name: 'comment' })
    post: PostEntity;
    // done
    @ManyToOne(() => CommentEntity, (comment) => comment.replies)
    @JoinColumn({ name: 'replyCmt' })
    reply: CommentEntity;
    // done ???
    @OneToMany(() => CommentEntity, (comment) => comment.reply)
    replies: CommentEntity[];
    // done
    @ManyToMany(() => UserEntity, (user) => user.likedPosts)
    @JoinTable()
    likes: UserEntity[];
    // done
    @OneToMany(() => MailEntity, (mail) => mail.replyToCmt)
    replyMail: MailEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
