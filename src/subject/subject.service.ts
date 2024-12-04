import { Injectable, NotFoundException } from '@nestjs/common';
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

    async create(createSubjectDto: CreateSubjectDto): Promise<SubjectEntity> {
        const { majors, ...dto } = createSubjectDto;
        const newSubject = this.subjectRepository.create(dto);
        if (majors && majors.length > 0) {
            const majorPromise = majors.map(async (m) => {
                const major = await this.MajorRepository.findOne({
                    where: { Id: m },
                });
                if (!major) {
                    throw new NotFoundException(`Major with ID ${m} not found`);
                }
                return major;
            });

            newSubject.majors = await Promise.all(majorPromise);
        }

        return await this.subjectRepository.save(newSubject);
    }

    async findAll(count?: number, index: number = 0) {
        return await this.subjectRepository.find({
            take: count,
            skip: index,
        });
    }

    async findOne(id: string) {
        console.log(
            await this.subjectRepository.findOne({ where: { Id: id } }),
        );
        return await this.subjectRepository.findOne({
            where: { Id: id },
            relations: ['majors', 'inTranscript', 'classes'],
        });
    }

    async update(id: string, updateSubjectDto: UpdateSubjectDto) {
        await this.subjectRepository.update(id, updateSubjectDto);
        await this.subjectRepository.findOne({ where: { Id: id } });
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
