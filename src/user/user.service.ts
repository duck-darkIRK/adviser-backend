import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
    CreateUserDto,
    MajorEntity,
    UpdateUserDto,
    UserEntity,
} from '../types';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly UserRepository: Repository<UserEntity>,
        @InjectRepository(MajorEntity)
        private readonly MajorRepository: Repository<MajorEntity>,
    ) {}

    async createUser(createUserDto: CreateUserDto) {
        // create user
        const { majors, ...dto } = createUserDto;
        const newUser = this.UserRepository.create(dto);
        // hash password
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);
        // create major
        if (majors) {
            const majorPromise = majors.map(async (major) => {
                const majorEntity = await this.MajorRepository.findOne({
                    where: { Id: major },
                });
                if (majorEntity) {
                    return majorEntity;
                } else {
                    throw new NotFoundException(
                        `Major with Id: ${major} not found.`,
                    );
                }
            });
            newUser.majors = await Promise.all(majorPromise);
        }
        // summary
        return await this.UserRepository.save(newUser);
    }

    async findOneUser(id: string) {
        return await this.UserRepository.findOne({ where: { Id: id } });
    }

    async findOneUserByUsername(username: string) {
        return await this.UserRepository.findOne({
            where: { username: username },
        });
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto) {
        const user = await this.UserRepository.findOne({ where: { Id: id } });

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        await this.UserRepository.update(id, updateUserDto);

        return this.findOneUserByUsername(id);
    }

    async deleteUser(id: string) {
        const user = await this.UserRepository.createQueryBuilder('user')
            .where('user.id = :id', { id })
            .getOne();

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        user.isBaned = true;
        return await this.UserRepository.save(user);
    }

    async saveRefreshToken(refreshToken: string, id: string): Promise<string> {
        const user = await this.UserRepository.createQueryBuilder('user')
            .where('user.id = :id', { id })
            .getOne();

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        const updateUser = new UpdateUserDto();
        updateUser.refresh_token = refreshToken;

        await this.UserRepository.update(id, updateUser);

        return refreshToken;
    }
}
