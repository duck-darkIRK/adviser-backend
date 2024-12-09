import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
    CreateMajorDto,
    MajorEntity,
    SubjectEntity,
    UpdateMajorDto,
    UserEntity,
} from '../types';

@Injectable()
export class MajorService {
    constructor(
        @InjectRepository(MajorEntity)
        private readonly MajorRepository: Repository<MajorEntity>,
        @InjectRepository(UserEntity)
        private readonly UserRepository: Repository<UserEntity>,
        @InjectRepository(SubjectEntity)
        private readonly SubjectRepository: Repository<SubjectEntity>,
    ) {}

    async create(createMajorDto: CreateMajorDto) {
        const { subjects, ...dto } = createMajorDto;
        const newMajor = this.MajorRepository.create(dto);

        if (subjects && subjects.length > 0) {
            newMajor.subjects = [];

            const subjectPromises = subjects.map(async (s) => {
                const subject = await this.SubjectRepository.findOne({
                    where: { Id: s },
                });
                if (!subject) {
                    throw new NotFoundException(
                        `Not found subject with Id ${s}`,
                    );
                }
                return subject;
            });

            newMajor.subjects = await Promise.all(subjectPromises);
        }

        return await this.MajorRepository.save(newMajor);
    }

    async findAll(count?: number, index: number = 0) {
        return await this.MajorRepository.find({
            skip: index,
            take: count,
        });
    }

    async findOne(id: string) {
        return await this.MajorRepository.findOne({
            where: { Id: id },
            relations: ['subjects'],
        });
    }

    async update(id: string, updateMajorDto: UpdateMajorDto) {
        await this.MajorRepository.update(id, updateMajorDto);
        return this.MajorRepository.findOne({ where: { Id: id } });
    }

    async remove(id: string) {
        return await this.MajorRepository.createQueryBuilder()
            .update()
            .set({ isDeleted: true })
            .where('Id = :id', { id })
            .execute();
    }

    async addSubjectsToMajor(subjectsId: string[], majorId: string) {
        const majorEntity = await this.MajorRepository.findOne({
            where: { Id: majorId },
            relations: { subjects: true },
        });
        if (!majorEntity) {
            throw new NotFoundException(`Major with Id: ${majorId} not found.`);
        }
        if (new Set(subjectsId).size != subjectsId.length) {
            throw new NotFoundException(`Subjects were duplicate`);
        }
        const subjectsEntity = subjectsId.map(async (subjectId) => {
            const user = await this.SubjectRepository.findOne({
                where: { Id: subjectId },
            });
            if (user) {
                return user;
            } else {
                throw new NotFoundException(
                    `Subject with Id: ${user} not found.`,
                );
            }
        });
        majorEntity.subjects = [
            ...majorEntity.subjects,
            ...(await Promise.all(subjectsEntity)),
        ];
        return await this.MajorRepository.save(majorEntity);
    }

    async removeSubjectsToClass(subjectsId: string[], majorId: string) {
        const majorEntity = await this.MajorRepository.findOne({
            where: { Id: majorId },
            relations: { subjects: true },
        });
        if (!majorEntity) {
            throw new NotFoundException(`Major with Id: ${majorId} not found.`);
        }

        if (new Set(subjectsId).size !== subjectsId.length) {
            throw new BadRequestException(`Subjects were duplicate`);
        }

        await Promise.all(
            subjectsId.map(async (subjectId) => {
                const subject = await this.SubjectRepository.findOne({
                    where: { Id: subjectId },
                });
                if (!subject) {
                    throw new NotFoundException(
                        `Subject with Id: ${subjectId} not found.`,
                    );
                }
            }),
        );

        await this.MajorRepository.createQueryBuilder()
            .relation(MajorEntity, 'subjects')
            .of(majorEntity)
            .remove(subjectsId);

        return await this.MajorRepository.save(majorEntity);
    }
}
