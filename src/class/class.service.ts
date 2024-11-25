import { Injectable } from '@nestjs/common';
import {
    ClassEntity,
    CreateClassDto,
    SubjectEntity,
    UpdateClassDto,
    UserEntity,
} from '../types';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ClassService {
    constructor(
        @InjectRepository(ClassEntity)
        private readonly ClassRepository: Repository<ClassEntity>,
        @InjectRepository(SubjectEntity)
        private readonly SubjectRepository: Repository<SubjectEntity>,
        @InjectRepository(UserEntity)
        private readonly UserRepository: Repository<UserEntity>,
    ) {}

    create(createClassDto: CreateClassDto) {
        return this.ClassRepository.create(createClassDto);
    }

    async findAll() {
        return await this.ClassRepository.createQueryBuilder('class').getMany();
    }

    async findOne(id: number) {
        return await this.ClassRepository.createQueryBuilder('class')
            .where('class.id = :id', { id: id })
            .getOne();
    }

    update(id: number, updateClassDto: UpdateClassDto) {
        return `This action updates a #${id} class`;
    }

    async remove(id: number) {
        return await this.ClassRepository.createQueryBuilder()
            .update()
            .set({ isDeleted: true })
            .where('class.id = :id', { id: id })
            .execute();
    }
}
