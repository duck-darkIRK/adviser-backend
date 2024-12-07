import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import {
    CreateUserDto,
    MajorEntity,
    UpdateUserDto,
    UserEntity,
} from '../types';
import * as bcrypt from 'bcrypt';
import { SearchUserDto } from '../types/search/search-user.dto';

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
        return await this.UserRepository.findOne({
            where: { Id: id },
            relations: [
                'majors',
                'transcripts',
                'send',
                'receive',
                'timetables',
                'notifications',
                'posts',
                'readPosts',
                // 'likedPosts',
                'classes',
                'teach',
                'comments',
            ],
        });
    }

    async findOneUserByUsername(username: string) {
        return await this.UserRepository.findOne({
            where: { username: username },
        });
    }

    async findAllUsers(count?: number, index: number = 0, dto?: SearchUserDto) {
        const {
            firstName,
            lastName,
            email,
            isOnline,
            isBaned,
            roles,
            relations,
        } = dto;

        const whereConditions: any = {};

        if (firstName) {
            whereConditions.firstName = firstName;
        }
        if (lastName) {
            whereConditions.lastName = lastName;
        }
        if (email) {
            whereConditions.email = email;
        }
        if (isOnline !== undefined) {
            whereConditions.isOnline = isOnline;
        }
        if (isBaned !== undefined) {
            whereConditions.isBaned = isBaned;
        }
        if (roles && roles.length > 0) {
            whereConditions.roles = In(roles);
        }

        return await this.UserRepository.find({
            where: whereConditions,
            take: count,
            skip: index,
            relations: relations ?? null,
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
