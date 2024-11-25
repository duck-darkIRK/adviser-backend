import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { TimetableService } from './timetable.service';
import { CreateTimetableDto, UpdateTimetableDto } from '../types';

@Controller('timetable')
export class TimetableController {
    constructor(private readonly timetableService: TimetableService) {}

    @Post()
    create(@Body() createTimetableDto: CreateTimetableDto) {
        return this.timetableService.create(createTimetableDto);
    }

    @Get()
    findAll() {
        return this.timetableService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.timetableService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateTimetableDto: UpdateTimetableDto,
    ) {
        return this.timetableService.update(+id, updateTimetableDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.timetableService.remove(+id);
    }
}
