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
        private readonly transcriptRepository: Repository<TranscriptEntity>,
        @InjectRepository(SubjectEntity)
        private readonly SubjectRepository: Repository<SubjectEntity>,
        @InjectRepository(UserEntity)
        private readonly UserRepository: Repository<UserEntity>,
    ) {}

    async create(createTranscriptDto: CreateTranscriptDto) {
        const { user, subject, ...dto } = createTranscriptDto;
        const newTranscript = this.transcriptRepository.create(dto);
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
        return await this.transcriptRepository.save(newTranscript);
    }

    async findAll(count?: number, index: number = 0) {
        return await this.transcriptRepository.find({
            take: count,
            skip: index,
        });
    }

    async findOne(id: number) {
        return await this.transcriptRepository.findOne({
            where: { Id: id },
            relations: ['user', 'subject'],
        });
    }

    async update(id: number, updateTranscriptDto: UpdateTranscriptDto) {
        await this.transcriptRepository.update(id, updateTranscriptDto);
        return await this.transcriptRepository.findOne({ where: { Id: id } });
    }
}
