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
import { Comment } from './comment.entity';
import { User } from './user.entity';
import { Mail } from './mail.entity';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    Id: number;

    @Column({ nullable: true })
    title: string;

    @Column({ type: 'text', nullable: true })
    content: string;

    @Column({ nullable: true, type: 'simple-array' })
    image: string[];
    // done
    @OneToMany(() => Comment, (comment) => comment.post)
    comments: Comment[];
    // done
    @ManyToMany(() => User, (user) => user.likedPosts)
    @JoinTable()
    likes: User[];
    // done
    @ManyToOne(() => User, (user) => user.posts)
    @JoinColumn({ name: 'owner' })
    user: User;
    // done
    @ManyToMany(() => User, (user) => user.readPosts)
    reader: User[];
    // done
    @OneToMany(() => Mail, (mail) => mail.replyToPost)
    reply: Mail[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
