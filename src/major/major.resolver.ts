import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MajorService } from './major.service';
import { Major, MajorInput, SubjectEntity, UserEntity } from '../types';
import { ParseIntPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Resolver(() => Major) // Chỉnh sửa tại đây, trả về Major ObjectType
export class MajorResolver {
    constructor(
        private readonly majorService: MajorService,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(SubjectEntity)
        private readonly subjectRepository: Repository<SubjectEntity>,
    ) {}

    @Query(() => [Major])
    async getAllMajors() {
        return this.majorService.findAll();
    }

    @Query(() => Major, { nullable: true })
    async getMajorById(
        @Args('id', { type: () => Number }, ParseIntPipe) id: number,
    ) {
        return this.majorService.findOne(id);
    }

    @Mutation(() => Major) // Trả về Major ObjectType
    async createMajor(@Args('createMajorDto') createMajorDto: MajorInput) {
        // return this.majorService.create(createMajorDto);
    }

    @Mutation(() => Major) // Trả về Major ObjectType
    async updateMajor(
        @Args('id', { type: () => Number }, ParseIntPipe) id: number,
        @Args('updateMajorDto') updateMajorDto: MajorInput,
    ) {
        const { users, subjects, Id, ...dto } = updateMajorDto;
        const userDto = [];
        const subjectDto = [];
        if (users.length > 0) {
            users.forEach((user) => {
                userDto.push(
                    this.userRepository.findOne({ where: { Id: user.Id } }),
                );
            });
        }
        if (subjects.length > 0) {
            subjects.forEach((subject) => {
                subjectDto.push(
                    this.subjectRepository.findOne({
                        where: { Id: subject.Id },
                    }),
                );
            });
        }
        return this.majorService.update(id, dto);
    }

    @Mutation(() => Boolean)
    async removeMajor(
        @Args('id', { type: () => Number }, ParseIntPipe) id: number,
    ) {
        await this.majorService.remove(id);
        return true;
    }
}
