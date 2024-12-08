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
        return await this.ClassRepository.save(newClass);
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

    async updateSubjectInClass(subjectId: string, classId: number) {
        const classEntity = await this.ClassRepository.findOne({
            where: { Id: classId },
        });
        if (!classEntity) {
            throw new NotFoundException(`Class with Id: ${classId} not found.`);
        }
        const subjectEntity = await this.SubjectRepository.findOne({
            where: { Id: subjectId },
        });
        if (subjectEntity) {
            classEntity.subject = subjectEntity;
        } else {
            throw new NotFoundException(
                `Subject with Id: ${subjectId} not found.`,
            );
        }
        return await this.ClassRepository.save(classEntity);
    }

    async addStudentsToClass(usersId: string[], classId: number) {
        const classEntity = await this.ClassRepository.findOne({
            where: { Id: classId },
            relations: { students: true },
        });
        if (!classEntity) {
            throw new NotFoundException(`Class with Id: ${classId} not found.`);
        }
        if (new Set(usersId).size != usersId.length) {
            throw new NotFoundException(`Students were duplicate`);
        }
        const usersEntity = usersId.map(async (userId) => {
            const user = await this.UserRepository.findOne({
                where: { Id: userId },
            });
            if (user) {
                return user;
            } else {
                throw new NotFoundException(`User with Id: ${user} not found.`);
            }
        });
        classEntity.students = [
            ...classEntity.students,
            ...(await Promise.all(usersEntity)),
        ];
        return await this.ClassRepository.save(classEntity);
    }

    async removeStudentsToClass(usersId: string[], classId: number) {
        const classEntity = await this.ClassRepository.findOne({
            where: { Id: classId },
            relations: { students: true },
        });
        if (!classEntity) {
            throw new NotFoundException(`Class with Id: ${classId} not found.`);
        }
        if (new Set(usersId).size != usersId.length) {
            throw new NotFoundException(`Students were duplicate`);
        }
        await Promise.all(
            usersId.map(async (userId) => {
                const user = await this.UserRepository.findOne({
                    where: { Id: userId },
                });
                if (user) {
                    return user;
                } else {
                    throw new NotFoundException(
                        `User with Id: ${user} not found.`,
                    );
                }
            }),
        );
        classEntity.students = classEntity.students.filter(
            (student) => !usersId.includes(student.Id),
        );
        return await this.ClassRepository.save(classEntity);
    }

    async addTeachersToClass(usersId: string[], classId: number) {
        const classEntity = await this.ClassRepository.findOne({
            where: { Id: classId },
            relations: { teachers: true },
        });
        if (!classEntity) {
            throw new NotFoundException(`Class with Id: ${classId} not found.`);
        }
        if (new Set(usersId).size != usersId.length) {
            throw new NotFoundException(`Students were duplicate`);
        }
        const usersEntity = usersId.map(async (userId) => {
            const user = await this.UserRepository.findOne({
                where: { Id: userId },
            });
            if (user) {
                return user;
            } else {
                throw new NotFoundException(`User with Id: ${user} not found.`);
            }
        });
        classEntity.teachers = [
            ...classEntity.teachers,
            ...(await Promise.all(usersEntity)),
        ];
        return await this.ClassRepository.save(classEntity);
    }

    async removeTeachersToClass(usersId: string[], classId: number) {
        const classEntity = await this.ClassRepository.findOne({
            where: { Id: classId },
            relations: { teachers: true },
        });
        if (!classEntity) {
            throw new NotFoundException(`Class with Id: ${classId} not found.`);
        }
        if (new Set(usersId).size != usersId.length) {
            throw new NotFoundException(`Teachers were duplicate`);
        }
        await Promise.all(
            usersId.map(async (userId) => {
                const user = await this.UserRepository.findOne({
                    where: { Id: userId },
                });
                if (user) {
                    return user;
                } else {
                    throw new NotFoundException(
                        `User with Id: ${user} not found.`,
                    );
                }
            }),
        );
        classEntity.teachers = classEntity.teachers.filter(
            (teacher) => !usersId.includes(teacher.Id),
        );
        return await this.ClassRepository.save(classEntity);
    }

    async userGetAllClass(userId: string, count?: number, index: number = 0) {
        return await this.ClassRepository.createQueryBuilder('class')
            .innerJoinAndSelect('class.students', 'student')
            .leftJoinAndSelect('class.teachers', 'teacher')
            .leftJoinAndSelect('class.subject', 'subject')
            .where('student.Id = :userId', { userId })
            .take(count)
            .skip(index)
            .getMany();
    }

    async userGetAllTeachClass(
        userId: string,
        count?: number,
        index: number = 0,
    ) {
        return await this.ClassRepository.createQueryBuilder('class')
            .innerJoinAndSelect('class.teachers', 'teachers')
            .leftJoinAndSelect('class.students', 'students')
            .leftJoinAndSelect('class.subject', 'subject')
            .where('teachers.Id = :userId', { userId })
            .take(count)
            .skip(index)
            .getMany();
    }
}
