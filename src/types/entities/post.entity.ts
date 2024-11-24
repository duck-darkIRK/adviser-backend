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
import { CommentEntity } from './comment.entity';
import { UserEntity } from './user.entity';
import { MailEntity } from './mail.entity';

@Entity()
export class PostEntity {
    @PrimaryGeneratedColumn()
    Id: number;

    @Column({ nullable: true })
    title: string;

    @Column({ type: 'text', nullable: true })
    content: string;

    @Column({ nullable: true, type: 'simple-array' })
    image: string[];
    // done
    @OneToMany(() => CommentEntity, (comment) => comment.post)
    comments: CommentEntity[];
    // done
    @ManyToMany(() => UserEntity, (user) => user.likedPosts)
    @JoinTable()
    likes: UserEntity[];
    // done
    @ManyToOne(() => UserEntity, (user) => user.posts)
    @JoinColumn({ name: 'owner' })
    user: UserEntity;
    // done
    @ManyToMany(() => UserEntity, (user) => user.readPosts)
    reader: UserEntity[];
    // done
    @OneToMany(() => MailEntity, (mail) => mail.replyToPost)
    reply: MailEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
