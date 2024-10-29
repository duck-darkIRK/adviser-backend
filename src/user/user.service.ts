import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../types';
import { CreateUserDto } from '../types/dto/user/create-user.dto';
import { UpdateUserDto } from '../types/dto/user/update-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const newUser = this.userRepository.create(createUserDto);
        return await this.userRepository.save(newUser);
    }

    async findOneUser(id: number): Promise<User> {
        const user = await this.userRepository
            .createQueryBuilder('user')
            .where('user.Id = :id', { id })
            .getOne();

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.userRepository
            .createQueryBuilder('user')
            .where('user.Id = :id', { id })
            .getOne();

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        // Chỉ cập nhật các trường không liên kết
        Object.assign(user, updateUserDto);
        return await this.userRepository.save(user);
    }

    async deleteUser(id: number): Promise<void> {
        const user = await this.userRepository
            .createQueryBuilder('user')
            .where('user.Id = :id', { id })
            .getOne();

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        await this.userRepository.delete(id);
    }
}
