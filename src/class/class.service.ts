import { Injectable, NotFoundException } from '@nestjs/common';
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

    async create(createClassDto: CreateClassDto) {
        const { students, teachers, subject, ...dto } = createClassDto;
        const newClass = this.ClassRepository.create(dto);
        if (students && students.length > 0) {
            const studentPromise = students.map(async (studentId) => {
                const student = await this.UserRepository.findOne({
                    where: { Id: studentId },
                });
                if (student) {
                    return student;
                } else {
                    throw new NotFoundException(
                        `Student with ID ${student} not found`,
                    );
                }
            });
            newClass.students = await Promise.all(studentPromise);
        }
        if (teachers && teachers.length > 0) {
            const teacherPromise = teachers.map(async (teacherId) => {
                const teacher = await this.UserRepository.findOne({
                    where: { Id: teacherId },
                });
                if (teacher) {
                    return teacher;
                } else {
                    throw new NotFoundException(
                        `Teacher with ID ${teacher} not found`,
                    );
                }
            });
            newClass.teachers = await Promise.all(teacherPromise);
        }
        if (subject) {
            const subjectEntity = await this.SubjectRepository.findOne({
                where: { Id: subject },
            });
            if (subjectEntity) {
                newClass.subject = subjectEntity;
            } else {
                throw new NotFoundException(
                    `Subject with ID ${subject} not found`,
                );
            }
        }
        return this.ClassRepository.save(newClass);
    }

    async findAll(count?: number, index: number = 0) {
        return await this.ClassRepository.find({
            take: count,
            skip: index,
        });
    }

    async findOne(id: number) {
        return await this.ClassRepository.findOne({
            where: { Id: id },
            relations: ['subjects', 'teachers', 'student'],
        });
    }

    async update(id: number, updateClassDto: UpdateClassDto) {
        await this.ClassRepository.update(id, updateClassDto);
        return await this.ClassRepository.findOne({ where: { Id: id } });
    }

    async remove(id: number) {
        return await this.ClassRepository.createQueryBuilder()
            .update()
            .set({ isDeleted: true })
            .where('class.id = :id', { id: id })
            .execute();
    }
}
