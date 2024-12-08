import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    ClassEntity,
    CreateTimetableDto,
    CreateTimetableSheetDto,
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
        @InjectRepository(ClassEntity)
        private readonly ClassRepository: Repository<ClassEntity>,
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
                    const { classCode, ...dto } = sheet;
                    const newTimetableSheet =
                        this.TimetableSheetRepository.create(dto);
                    const classEntity = await this.ClassRepository.findOne({
                        where: { classCode: classCode },
                    });
                    if (classEntity) {
                        newTimetableSheet.class = classCode;
                    } else {
                        throw new NotFoundException(
                            `Class with Id: ${classCode} not found.`,
                        );
                    }
                    return newTimetableSheet;
                });
                const sheetsEntity = await Promise.all(sheetPromise);
                sheetsEntity.map(async (sheet) => {
                    return await this.TimetableSheetRepository.save(sheet);
                });
                newTimetable.sheets = sheetsEntity;
            } else {
                throw new Error(`Timetable is duplicate.`);
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

    async updateSheet(id: number, sheets: CreateTimetableSheetDto[]) {
        const timetable = await this.TimetableRepository.findOne({
            where: { Id: id },
            relations: ['sheets'],
        });
        if (!timetable) {
            throw new NotFoundException(`Timetable with Id: ${id} not found.`);
        }
        if (timetable.sheets && timetable.sheets.length > 0) {
            await this.TimetableSheetRepository.remove(timetable.sheets);
        }
        const sheetsPromise = sheets.map(async (sheet) => {
            const { classCode, ...dto } = sheet;
            const sheetEntity = this.TimetableSheetRepository.create(dto);
            const classEntity = await this.ClassRepository.findOne({
                where: { classCode: classCode },
            });
            if (classEntity) {
                sheetEntity.class = classCode;
            } else {
                throw new NotFoundException(
                    `Class with Id: ${classCode} not found.`,
                );
            }
            return sheetEntity;
        });
        if (!timetable) {
            throw new NotFoundException(`Timetable with Id: ${id} not found.`);
        }
        const sheetsEntity = await Promise.all(sheetsPromise);
        const newSheetEntity = sheetsEntity.map(async (sheet) => {
            return await this.TimetableSheetRepository.save(sheet);
        });
        timetable.sheets = await Promise.all(newSheetEntity);
        return await this.TimetableRepository.save(timetable);
    }

    async remove(id: number) {
        return await this.TimetableRepository.createQueryBuilder('timetable')
            .update()
            .set({ isDeleted: true })
            .where('timetable.id = :id', { id })
            .execute();
    }

    async userGetOwnTimetable(
        userId: string,
        count?: number,
        index: number = 0,
    ) {
        return await this.TimetableRepository.find({
            where: { user: { Id: userId } },
            relations: ['sheets'],
            take: count,
            skip: index,
        });
    }
}
