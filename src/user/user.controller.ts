import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../types/dto/user/create-user.dto';
import { UpdateUserDto } from '../types/dto/user/update-user.dto';
import { User } from '../types';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.createUser(createUserDto);
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<User> {
        return this.userService.findOneUser(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() updateUserDto: UpdateUserDto,
    ): Promise<User> {
        return this.userService.updateUser(id, updateUserDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
        return this.userService.deleteUser(id);
    }
}
