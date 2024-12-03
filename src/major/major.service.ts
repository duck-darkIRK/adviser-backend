import { Injectable, NotFoundException } from '@nestjs/common';
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
        private readonly majorRepository: Repository<MajorEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(SubjectEntity)
        private readonly subjectRepository: Repository<SubjectEntity>,
    ) {}

    async create(createMajorDto: CreateMajorDto): Promise<MajorEntity> {
        const { subjects, ...dto } = createMajorDto;
        const newMajor = this.majorRepository.create(dto);

        if (subjects && subjects.length > 0) {
            newMajor.subjects = [];

            const subjectPromises = subjects.map(async (s) => {
                const subject = await this.subjectRepository.findOne({
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

        return await this.majorRepository.save(newMajor);
    }

    async findAll(count?: number, index: number = 0) {
        return await this.majorRepository.find({
            skip: index,
            take: count,
        });
    }

    async findOne(id: string) {
        return await this.majorRepository
            .createQueryBuilder('major')
            .where('major.id = :id', { id: id })
            .getOne();
    }

    async update(id: string, updateMajorDto: UpdateMajorDto) {
        const { users, subjects, ...dto } = updateMajorDto;

        // Cập nhật các trường chính
        await this.majorRepository
            .createQueryBuilder('major')
            .update()
            .set(dto)
            .where('major.id = :id', { id })
            .execute();

        // Cập nhật quan hệ users
        if (users?.length > 0) {
            await this.majorRepository
                .createQueryBuilder()
                .relation(MajorEntity, 'users')
                .of(id)
                .add(users);
        }

        // Cập nhật quan hệ subjects
        if (subjects?.length > 0) {
            await this.majorRepository
                .createQueryBuilder()
                .relation(MajorEntity, 'subjects')
                .of(id)
                .add(subjects);
        }

        return this.majorRepository.findOne({ where: { Id: id } });
    }

    async remove(id: number) {
        return await this.majorRepository
            .createQueryBuilder('major')
            .update()
            .set({ isDeleted: true })
            .where('major.id = :id', { id: id })
            .execute();
    }
}
