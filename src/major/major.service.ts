import { Injectable } from '@nestjs/common';
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

    async create(createMajorDto: CreateMajorDto) {
        const newMajor = this.majorRepository.create(createMajorDto);
        return await this.majorRepository.save(newMajor);
    }

    async findAll() {
        return await this.majorRepository.createQueryBuilder().getMany();
    }

    async findOne(id: number) {
        return await this.majorRepository
            .createQueryBuilder('major')
            .where('major.id = :id', { id: id })
            .getOne();
    }

    async update(id: number, updateMajorDto: UpdateMajorDto) {
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
            const userIds = users.map((user) => user.Id);
            await this.majorRepository
                .createQueryBuilder()
                .relation(MajorEntity, 'users')
                .of(id)
                .add(userIds);
        }

        // Cập nhật quan hệ subjects
        if (subjects?.length > 0) {
            const subjectIds = subjects.map((subject) => subject.Id);
            await this.majorRepository
                .createQueryBuilder()
                .relation(MajorEntity, 'subjects')
                .of(id)
                .add(subjectIds);
        }
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
