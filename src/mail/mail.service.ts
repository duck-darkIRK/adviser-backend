import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    CommentEntity,
    CreateMailDto,
    MailEntity,
    PostEntity,
    UpdateMailDto,
    UserEntity,
} from '../types';
import { Repository } from 'typeorm';

@Injectable()
export class MailService {
    constructor(
        @InjectRepository(MailEntity)
        private readonly mailRepository: Repository<MailEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(PostEntity)
        private readonly postRepository: Repository<PostEntity>,
        @InjectRepository(CommentEntity)
        private readonly commentRepository: Repository<CommentEntity>,
    ) {}

    create(createMailDto: CreateMailDto) {
        return 'This action adds a new mail';
    }

    async findAll() {
        return await this.mailRepository.createQueryBuilder('mail').getMany();
    }

    async findOne(id: number) {
        return await this.mailRepository
            .createQueryBuilder('mail')
            .where('mail.id = :id', { id: id })
            .getOne();
    }

    update(id: number, updateMailDto: UpdateMailDto) {
        return `This action updates a #${id} mail`;
    }
}
