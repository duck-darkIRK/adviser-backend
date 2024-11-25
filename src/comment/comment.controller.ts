import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto, UpdateCommentDto } from '../types';

@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Post()
    create(@Body() createCommentDto: CreateCommentDto) {
        return this.commentService.create(createCommentDto);
    }

    @Get()
    findAll() {
        return this.commentService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.commentService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateCommentDto: UpdateCommentDto,
    ) {
        return this.commentService.update(+id, updateCommentDto);
    }
}
