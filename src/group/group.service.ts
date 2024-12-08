import { Injectable, NotFoundException } from '@nestjs/common';
import {
    CreateGroupDto,
    GroupEntity,
    UpdateGroupDto,
    UserEntity,
} from '../types';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GroupService {
    constructor(
        @InjectRepository(GroupEntity)
        private readonly GroupRepository: Repository<GroupEntity>,
        @InjectRepository(UserEntity)
        private readonly UserRepository: Repository<UserEntity>,
    ) {}

    async create(createGroupDto: CreateGroupDto) {
        const { students, advisers, ...dto } = createGroupDto;
        const newGroup = this.GroupRepository.create(dto);
        if (students && students.length > 0) {
            const memberPromise = students.map(async (memberId) => {
                const member = await this.UserRepository.findOne({
                    where: { Id: memberId },
                });
                if (member) {
                    return member;
                } else {
                    throw new NotFoundException(
                        `Member with ID ${memberId} not found`,
                    );
                }
            });
            newGroup.students = await Promise.all(memberPromise);
        }
        if (advisers && advisers.length > 0) {
            const adminPromise = advisers.map(async (adminId) => {
                const admin = await this.UserRepository.findOne({
                    where: { Id: adminId },
                });
                if (admin) {
                    return admin;
                } else {
                    throw new NotFoundException(
                        `Admin with ID ${adminId} not found`,
                    );
                }
            });
            newGroup.advisers = await Promise.all(adminPromise);
        }
        return this.GroupRepository.save(newGroup);
    }

    async findAll(count?: number, index: number = 0) {
        return await this.GroupRepository.find({
            take: count,
            skip: index,
        });
    }

    async findOne(id: number) {
        return await this.GroupRepository.findOne({
            where: { Id: id },
            relations: ['subject', 'advisers', 'students'],
        });
    }

    async update(id: number, updateGroupDto: UpdateGroupDto) {
        await this.GroupRepository.update(id, updateGroupDto);
        return await this.GroupRepository.findOne({ where: { Id: id } });
    }

    async remove(id: number) {
        return await this.GroupRepository.createQueryBuilder()
            .update()
            .set({ isDeleted: true })
            .where('group.id = :id', { id: id })
            .execute();
    }

    async addStudentsToGroup(usersId: string[], groupId: number) {
        const groupEntity = await this.GroupRepository.findOne({
            where: { Id: groupId },
            relations: { students: true },
        });
        if (!groupEntity) {
            throw new NotFoundException(`Group with Id: ${groupId} not found.`);
        }
        if (new Set(usersId).size != usersId.length) {
            throw new NotFoundException(`students were duplicate`);
        }
        const usersEntity = usersId.map(async (userId) => {
            const user = await this.UserRepository.findOne({
                where: { Id: userId },
            });
            if (user) {
                return user;
            } else {
                throw new NotFoundException(
                    `User with Id: ${userId} not found.`,
                );
            }
        });
        groupEntity.students = [
            ...groupEntity.students,
            ...(await Promise.all(usersEntity)),
        ];
        return await this.GroupRepository.save(groupEntity);
    }

    async removeStudentsFromGroup(usersId: string[], groupId: number) {
        const groupEntity = await this.GroupRepository.findOne({
            where: { Id: groupId },
            relations: { students: true },
        });
        if (!groupEntity) {
            throw new NotFoundException(`Group with Id: ${groupId} not found.`);
        }
        if (new Set(usersId).size != usersId.length) {
            throw new NotFoundException(`students were duplicate`);
        }
        groupEntity.students = groupEntity.students.filter(
            (member) => !usersId.includes(member.Id),
        );
        return await this.GroupRepository.save(groupEntity);
    }

    async addAdvisersToGroup(usersId: string[], groupId: number) {
        const groupEntity = await this.GroupRepository.findOne({
            where: { Id: groupId },
            relations: { advisers: true },
        });
        if (!groupEntity) {
            throw new NotFoundException(`Group with Id: ${groupId} not found.`);
        }
        if (new Set(usersId).size != usersId.length) {
            throw new NotFoundException(`advisers were duplicate`);
        }
        const usersEntity = usersId.map(async (userId) => {
            const user = await this.UserRepository.findOne({
                where: { Id: userId },
            });
            if (user) {
                return user;
            } else {
                throw new NotFoundException(
                    `User with Id: ${userId} not found.`,
                );
            }
        });
        groupEntity.advisers = [
            ...groupEntity.advisers,
            ...(await Promise.all(usersEntity)),
        ];
        return await this.GroupRepository.save(groupEntity);
    }

    async removeAdvisersFromGroup(usersId: string[], groupId: number) {
        const groupEntity = await this.GroupRepository.findOne({
            where: { Id: groupId },
            relations: { advisers: true },
        });
        if (!groupEntity) {
            throw new NotFoundException(`Group with Id: ${groupId} not found.`);
        }
        if (new Set(usersId).size != usersId.length) {
            throw new NotFoundException(`advisers were duplicate`);
        }
        groupEntity.advisers = groupEntity.advisers.filter(
            (admin) => !usersId.includes(admin.Id),
        );
        return await this.GroupRepository.save(groupEntity);
    }

    async userGetAllGroups(userId: string, count?: number, index: number = 0) {
        return await this.GroupRepository.createQueryBuilder('class')
            .innerJoinAndSelect('class.students', 'student')
            .leftJoinAndSelect('class.advisers', 'teacher')
            .where('student.Id = :userId', { userId })
            .take(count)
            .skip(index)
            .getMany();
    }

    async userGetAllAdviseGroups(
        userId: string,
        count?: number,
        index: number = 0,
    ) {
        return await this.GroupRepository.createQueryBuilder('class')
            .innerJoinAndSelect('class.teachers', 'teachers')
            .leftJoinAndSelect('class.students', 'students')
            .where('teachers.Id = :userId', { userId })
            .take(count)
            .skip(index)
            .getMany();
    }
}
