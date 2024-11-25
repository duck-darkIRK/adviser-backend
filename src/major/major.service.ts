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

    create(createMajorDto: CreateMajorDto) {
        return 'This action adds a new major';
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

    update(id: number, updateMajorDto: UpdateMajorDto) {
        return `This action updates a #${id} major`;
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
