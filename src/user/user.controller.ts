import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../types';
import { Public } from '../decorator/guard.config';
import { SafeUserEntity } from '../types/entities/user.entity';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Public()
    @Post()
    async create(
        @Body() createUserDto: CreateUserDto,
    ): Promise<SafeUserEntity> {
        return this.userService.createUser(createUserDto);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<SafeUserEntity> {
        return this.userService.findOneUser(id);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<SafeUserEntity> {
        return this.userService.deleteUser(id);
    }
}
