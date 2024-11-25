import { Injectable } from '@nestjs/common';
import {
    CreateTimetableSheetDto,
    TimetableEntity,
    TimetableSheetEntity,
    UpdateTimetableSheetDto,
} from '../types';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TimetableSheetService {
    constructor(
        @InjectRepository(TimetableSheetEntity)
        private readonly timetableSheetRepository: Repository<TimetableSheetEntity>,
        @InjectRepository(TimetableEntity)
        private readonly timetableSheetEntity: TimetableSheetEntity,
    ) {}

    create(createTimetableSheetDto: CreateTimetableSheetDto) {
        return 'This action adds a new timetablesheet';
    }

    async findAll() {
        return await this.timetableSheetRepository
            .createQueryBuilder()
            .getMany();
    }

    async findOne(id: number) {
        return await this.timetableSheetRepository
            .createQueryBuilder('timetablesheet')
            .where('timetablesheet.id = :id', { id: id })
            .getOne();
    }

    update(id: number, updateTimetableSheetDto: UpdateTimetableSheetDto) {
        return `This action updates a #${id} timetablesheet`;
    }
}
