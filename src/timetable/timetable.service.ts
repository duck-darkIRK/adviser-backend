import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    CreateTimetableDto,
    TimetableEntity,
    TimetableSheetEntity,
    UpdateTimetableDto,
    UserEntity,
} from '../types';
import { Repository } from 'typeorm';

@Injectable()
export class TimetableService {
    constructor(
        @InjectRepository(TimetableEntity)
        private readonly timetableRepository: Repository<TimetableEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(TimetableSheetEntity)
        private readonly postRepository: Repository<TimetableSheetEntity>,
    ) {}

    create(createTimetableDto: CreateTimetableDto) {
        return 'This action adds a new timetable';
    }

    async findAll() {
        return await this.timetableRepository.createQueryBuilder().getMany();
    }

    async findOne(id: number) {
        return await this.timetableRepository
            .createQueryBuilder('timetable')
            .where('timetable.id = :id', { id: id })
            .getOne();
    }

    update(id: number, updateTimetableDto: UpdateTimetableDto) {
        return `This action updates a #${id} timetable`;
    }

    async remove(id: number) {
        return await this.timetableRepository
            .createQueryBuilder('timetable')
            .update()
            .set({ isDeleted: true })
            .where('timetable.id = :id', { id })
            .execute();
    }
}
