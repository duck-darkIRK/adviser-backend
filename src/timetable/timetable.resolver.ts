import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TimetableService } from './timetable.service';
import {
    CreateTimetableDto,
    TimetableEntity,
    UpdateTimetableDto,
} from '../types';
import { ParseIntPipe } from '@nestjs/common';

@Resolver(() => TimetableEntity)
export class TimetableResolver {
    constructor(private readonly timetableService: TimetableService) {}

    @Mutation(() => TimetableEntity)
    async createTimetable(
        @Args('createTimetableDto') createTimetableDto: CreateTimetableDto,
    ): Promise<TimetableEntity> {
        return await this.timetableService.create(createTimetableDto);
    }

    @Query(() => [TimetableEntity])
    async getAllTimetables(
        @Args('count', ParseIntPipe) count?: number,
        @Args('index', ParseIntPipe)
        index?: number,
    ): Promise<TimetableEntity[]> {
        return await this.timetableService.findAll(count, index);
    }

    @Query(() => TimetableEntity, { nullable: true })
    async getTimetableById(
        @Args('id', ParseIntPipe) id: number,
    ): Promise<TimetableEntity | null> {
        return await this.timetableService.findOne(id);
    }

    @Mutation(() => TimetableEntity)
    async updateTimetable(
        @Args('id', ParseIntPipe) id: number,
        @Args('updateTimetableDto') updateTimetableDto: UpdateTimetableDto,
    ): Promise<TimetableEntity> {
        return await this.timetableService.update(id, updateTimetableDto);
    }

    @Mutation(() => Boolean)
    async removeTimetable(
        @Args('id', ParseIntPipe) id: number,
    ): Promise<boolean> {
        await this.timetableService.remove(id);
        return true;
    }
}
