import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { TimetableSheetService } from './timetablesheet.service';
import { CreateTimetableSheetDto, UpdateTimetableSheetDto } from '../types';

@Controller('timetablesheet')
export class TimetableSheetController {
    constructor(
        private readonly timetableSheetService: TimetableSheetService,
    ) {}

    @Post()
    create(@Body() createTimetableSheetDto: CreateTimetableSheetDto) {
        return this.timetableSheetService.create(createTimetableSheetDto);
    }

    @Get()
    findAll() {
        return this.timetableSheetService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.timetableSheetService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateTimetableSheetDto: UpdateTimetableSheetDto,
    ) {
        return this.timetableSheetService.update(+id, updateTimetableSheetDto);
    }
}
