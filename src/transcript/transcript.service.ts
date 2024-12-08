import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    CreateTranscriptDto,
    SubjectEntity,
    TranscriptEntity,
    UpdateTranscriptDto,
    UserEntity,
} from '../types';
import { Repository } from 'typeorm';

@Injectable()
export class TranscriptService {
    constructor(
        @InjectRepository(TranscriptEntity)
        private readonly TranscriptRepository: Repository<TranscriptEntity>,
        @InjectRepository(SubjectEntity)
        private readonly SubjectRepository: Repository<SubjectEntity>,
        @InjectRepository(UserEntity)
        private readonly UserRepository: Repository<UserEntity>,
    ) {}

    async create(createTranscriptDto: CreateTranscriptDto) {
        const { user, subject, ...dto } = createTranscriptDto;
        const newTranscript = this.TranscriptRepository.create(dto);
        if (user) {
            const userEntity = await this.UserRepository.findOne({
                where: { Id: user },
            });
            if (userEntity) {
                newTranscript.user = userEntity;
            } else {
                throw new NotFoundException(`User with Id: ${user} not found.`);
            }
        }
        if (subject) {
            const subjectEntity = await this.SubjectRepository.findOne({
                where: { Id: subject },
            });
            if (subjectEntity) {
                newTranscript.subject = subjectEntity;
            } else {
                throw new NotFoundException(
                    `Subject with Id: ${subject} not found.`,
                );
            }
        }
        return await this.TranscriptRepository.save(newTranscript);
    }

    async findAll(count?: number, index: number = 0) {
        return await this.TranscriptRepository.find({
            take: count,
            skip: index,
        });
    }

    async findOne(id: number) {
        return await this.TranscriptRepository.findOne({
            where: { Id: id },
            relations: ['user', 'subject'],
        });
    }

    async update(id: number, updateTranscriptDto: UpdateTranscriptDto) {
        await this.TranscriptRepository.update(id, updateTranscriptDto);
        return await this.TranscriptRepository.findOne({ where: { Id: id } });
    }

    async userGetOwnTranscript(id: string) {
        const userEntity = await this.UserRepository.findOne({
            where: { Id: id },
        });
        if (!userEntity) {
            throw new NotFoundException(`User with Id: ${id} not found.`);
        }
        return await this.TranscriptRepository.find({
            where: { user: userEntity },
        });
    }
}
