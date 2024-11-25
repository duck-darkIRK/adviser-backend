import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    ClassEntity,
    CreateSubjectDto,
    MajorEntity,
    SubjectEntity,
    TranscriptEntity,
    UpdateSubjectDto,
} from '../types';
import { Repository } from 'typeorm';

@Injectable()
export class SubjectService {
    constructor(
        @InjectRepository(SubjectEntity)
        private readonly subjectRepository: Repository<SubjectEntity>,
        @InjectRepository(ClassEntity)
        private readonly UserRepository: Repository<ClassEntity>,
        @InjectRepository(MajorEntity)
        private readonly MajorRepository: Repository<MajorEntity>,
        @InjectRepository(TranscriptEntity)
        private readonly TranscriptRepository: Repository<TranscriptEntity>,
    ) {}

    async create(createSubjectDto: CreateSubjectDto) {
        // const newSubject = this.subjectRepository.create(createSubjectDto);
        // return this.subjectRepository.save(newSubject);
        return 'ok';
    }

    async findAll() {
        return await this.subjectRepository.createQueryBuilder().getMany();
    }

    async findOne(id: number) {
        return await this.subjectRepository
            .createQueryBuilder('subject')
            .where('subject.id = :id', { id })
            .getOne();
    }

    update(id: number, updateSubjectDto: UpdateSubjectDto) {
        return `This action updates a #${id} subject`;
    }

    async remove(id: number) {
        return await this.subjectRepository
            .createQueryBuilder('subject')
            .update()
            .set({ isDeleted: true })
            .where('subject.id = :id', { id })
            .execute();
    }
}
