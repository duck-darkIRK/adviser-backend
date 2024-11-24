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
import { PostEntity } from './post.entity';
import { CommentEntity } from './comment.entity';
import { UserEntity } from './user.entity';

@Entity()
export class MailEntity {
    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    type: string;

    @Column()
    name: string;

    @Column({ type: 'text' })
    content: string;
    // done
    @OneToOne(() => UserEntity)
    @JoinColumn({ name: 'sender' })
    sender: UserEntity;
    // done
    @OneToOne(() => UserEntity)
    @JoinColumn({ name: 'receiver' })
    receiver: UserEntity;
    // done
    @ManyToOne(() => MailEntity, (mail) => mail.replyToMail)
    @JoinColumn({ name: 'replyToMail' })
    replyToMail: MailEntity;
    // done
    @ManyToOne(() => PostEntity, (post) => post.reply)
    @JoinColumn({ name: 'replyToPost' })
    replyToPost: PostEntity;
    // done
    @ManyToOne(() => CommentEntity, (comment) => comment.replyMail)
    @JoinColumn({ name: 'replyToCmt' })
    replyToCmt: CommentEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
