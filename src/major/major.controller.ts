import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { MajorService } from './major.service';
import { CreateMajorDto, UpdateMajorDto } from '../types';

@Controller('major')
export class MajorController {
    constructor(private readonly majorService: MajorService) {}

    @Post()
    create(@Body() createMajorDto: CreateMajorDto) {
        return this.majorService.create(createMajorDto);
    }

    @Get()
    findAll() {
        return this.majorService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.majorService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateMajorDto: UpdateMajorDto) {
        return this.majorService.update(+id, updateMajorDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.majorService.remove(+id);
    }
}
