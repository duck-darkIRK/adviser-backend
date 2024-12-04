import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ClassService } from './class.service';
import { ClassEntity, CreateClassDto, UpdateClassDto } from '../types';
import { NotFoundException } from '@nestjs/common';

@Resolver(() => ClassEntity)
export class ClassResolver {
    constructor(private readonly classService: ClassService) {}

    @Query(() => [ClassEntity])
    async getAllClasses(
        @Args('count', { type: () => Int, nullable: true }) count: number,
        @Args('index', { type: () => Int, defaultValue: 0 }) index: number,
    ) {
        return this.classService.findAll(count, index);
    }

    @Query(() => ClassEntity)
    async getClassById(@Args('id', { type: () => Int }) id: number) {
        const classEntity = await this.classService.findOne(id);
        if (!classEntity) {
            throw new NotFoundException(`Class with ID ${id} not found`);
        }
        return classEntity;
    }

    @Mutation(() => ClassEntity)
    async createClass(@Args('createClassDto') createClassDto: CreateClassDto) {
        return this.classService.create(createClassDto);
    }

    @Mutation(() => ClassEntity)
    async updateClass(
        @Args('id', { type: () => Int }) id: number,
        @Args('updateClassDto') updateClassDto: UpdateClassDto,
    ) {
        const updatedClass = await this.classService.update(id, updateClassDto);
        if (!updatedClass) {
            throw new NotFoundException(`Class with ID ${id} not found`);
        }
        return updatedClass;
    }

    @Mutation(() => Boolean)
    async removeClass(@Args('id', { type: () => Int }) id: number) {
        const result = await this.classService.remove(id);
        return result.affected > 0;
    }
}
