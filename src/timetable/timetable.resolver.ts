import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TimetableService } from './timetable.service';
import {
    CreateTimetableDto,
    CreateTimetableSheetDto,
    TimetableEntity,
    TimetableSheetEntity,
    UpdateTimetableDto,
} from '../types';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { GqlRolesGuard } from '../auth/gqlRoles.guard';
import { GqlAuthGuard } from '../auth/passport/gql-jwt-auth.guard';
import { Roles } from '../decorator/roles.decorator';
import { Role } from '../auth/role.enum';
import { GqlCurrentUser } from '../decorator/GqlCurrentUser.decorator';

@Roles(Role.Admin)
@UseGuards(GqlRolesGuard)
@UseGuards(GqlAuthGuard)
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
        @Args('count', { type: () => Int, nullable: true })
        count?: number,
        @Args('index', { type: () => Int, nullable: true })
        index?: number,
    ): Promise<TimetableEntity[]> {
        return await this.timetableService.findAll(count, index);
    }

    @Query(() => TimetableEntity, { nullable: true })
    async getTimetableById(
        @Args('id', { type: () => Int }, ParseIntPipe) id: number,
    ): Promise<TimetableEntity | null> {
        return await this.timetableService.findOne(id);
    }

    @Mutation(() => TimetableEntity)
    async updateTimetable(
        @Args('id', { type: () => Int }, ParseIntPipe) id: number,
        @Args('updateTimetableDto') updateTimetableDto: UpdateTimetableDto,
    ): Promise<TimetableEntity> {
        return await this.timetableService.update(id, updateTimetableDto);
    }

    @Mutation(() => TimetableEntity, { name: 'updateDetailTimetable' })
    async updateTimetableSheets(
        @Args('timetableId', { type: () => Int }) id: number,
        @Args('sheets', { type: () => [CreateTimetableSheetDto] })
        sheets: CreateTimetableSheetDto[],
    ) {
        return this.timetableService.updateSheet(id, sheets);
    }

    @Mutation(() => Boolean)
    async removeTimetable(
        @Args('id', { type: () => Int }, ParseIntPipe) id: number,
    ): Promise<boolean> {
        await this.timetableService.remove(id);
        return true;
    }

    @Mutation(() => TimetableSheetEntity)
    async timetableForm(
        createTimetableSheetDto: CreateTimetableSheetDto,
    ): Promise<void> {}

    @Query(() => [TimetableEntity], { name: 'USER_getTimetables' })
    async userGetAllTimetable(
        @GqlCurrentUser() owner,
        @Args('count', { type: () => Int, nullable: true }) count?: number,
        @Args('index', { type: () => Int, nullable: true }) index?: number,
    ) {
        return await this.timetableService.userGetOwnTimetable(
            owner.Id,
            count,
            index,
        );
    }
}
