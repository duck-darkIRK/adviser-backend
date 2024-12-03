import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MajorService } from './major.service';
import {
    CreateMajorDto,
    Major,
    SubjectEntity,
    UpdateMajorDto,
    UserEntity,
} from '../types';
import { ParseIntPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Resolver(() => Major)
export class MajorResolver {
    constructor(
        private readonly majorService: MajorService,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(SubjectEntity)
        private readonly subjectRepository: Repository<SubjectEntity>,
    ) {}

    @Query(() => [Major])
    async getAllMajors(
        @Args('index', { type: () => Number, nullable: true })
        index?: number,
        @Args('count', { type: () => Number, nullable: true })
        count?: number,
    ) {
        return this.majorService.findAll(count ?? count, index ?? index);
    }

    @Query(() => Major, { nullable: true })
    async getMajorById(
        @Args('id', { type: () => Number }, ParseIntPipe) id: string,
    ) {
        return this.majorService.findOne(id);
    }

    @Mutation(() => Major) // Trả về Major ObjectType
    async createMajor(@Args('createMajorDto') createMajorDto: CreateMajorDto) {
        return this.majorService.create(createMajorDto);
    }

    @Mutation(() => Major) // Trả về Major ObjectType
    async updateMajor(
        @Args('updateMajorDto') updateMajorDto: UpdateMajorDto,
        @Args('id', { type: () => Number }, ParseIntPipe) id: string,
    ) {
        return this.majorService.update(id, updateMajorDto);
    }

    @Mutation(() => Boolean)
    async removeMajor(
        @Args('id', { type: () => Number }, ParseIntPipe) id: number,
    ) {
        await this.majorService.remove(id);
        return true;
    }
}
