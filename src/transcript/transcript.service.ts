import { Injectable } from '@nestjs/common';
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

    create(createTranscriptDto: CreateTranscriptDto) {
        return 'This action adds a new transcript';
    }

    async findAll() {
        return await this.transcriptRepository.createQueryBuilder().getMany();
    }

    async findOne(id: number) {
        return await this.transcriptRepository
            .createQueryBuilder('transcript')
            .where('transcript.id = :id', { id })
            .getOne();
    }

    update(id: number, updateTranscriptDto: UpdateTranscriptDto) {
        return `This action updates a #${id} transcript`;
    }
}
