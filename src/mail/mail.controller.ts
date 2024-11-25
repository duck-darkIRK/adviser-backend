import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { CreateMailDto, UpdateMailDto } from '../types';

@Controller('mail')
export class MailController {
    constructor(private readonly mailService: MailService) {}

    @Post()
    create(@Body() createMailDto: CreateMailDto) {
        return this.mailService.create(createMailDto);
    }

    @Get()
    findAll() {
        return this.mailService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.mailService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateMailDto: UpdateMailDto) {
        return this.mailService.update(+id, updateMailDto);
    }
}
