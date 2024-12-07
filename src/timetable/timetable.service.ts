import { Injectable, NotFoundException } from '@nestjs/common';
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
        private readonly TimetableRepository: Repository<TimetableEntity>,
        @InjectRepository(UserEntity)
        private readonly UserRepository: Repository<UserEntity>,
        @InjectRepository(TimetableSheetEntity)
        private readonly TimetableSheetRepository: Repository<TimetableSheetEntity>,
    ) {}

    async create(createTimetableDto: CreateTimetableDto) {
        const { sheets, user, ...dto } = createTimetableDto;
        const newTimetable = this.TimetableRepository.create(dto);
        if (user) {
            const userEntity = await this.UserRepository.findOne({
                where: { Id: user },
            });
            if (userEntity) {
                newTimetable.user = userEntity;
            } else {
                throw new NotFoundException(`User with Id: ${user} not found.`);
            }
        }
        const timeList = sheets.map((sheet) => sheet.time);
        if (timeList.length > 0) {
            if (new Set(timeList).size == timeList.length) {
                const sheetPromise = sheets.map(async (sheet) => {
                    const newTimetableSheet =
                        this.TimetableSheetRepository.create(sheet);
                    return await this.TimetableSheetRepository.save(
                        newTimetableSheet,
                    );
                });
                newTimetable.sheets = await Promise.all(sheetPromise);
            } else {
                throw new Error(`Transcript is duplicate.`);
            }
        }
        return await this.TimetableRepository.save(newTimetable);
    }

    async findAll(count?: number, index: number = 0) {
        return await this.TimetableRepository.find({
            take: count,
            skip: index,
        });
    }

    async findOne(id: number) {
        return await this.TimetableRepository.findOne({
            where: { Id: id },
            relations: ['user', 'sheets'],
        });
    }

    async update(id: number, updateTimetableDto: UpdateTimetableDto) {
        await this.TimetableRepository.update(id, updateTimetableDto);
        return await this.TimetableRepository.findOne({ where: { Id: id } });
    }

    async updateSheet(id: number, sheets: TimetableSheetEntity[]) {
        const timetable = await this.TimetableRepository.findOne({
            where: { Id: id },
        });
        if (!timetable) {
            throw new NotFoundException(`Timetable with Id: ${id} not found.`);
        }
        timetable.sheets = sheets;
        return await this.TimetableRepository.save(timetable);
    }

    async remove(id: number) {
        return await this.TimetableRepository.createQueryBuilder('timetable')
            .update()
            .set({ isDeleted: true })
            .where('timetable.id = :id', { id })
            .execute();
    }
}
